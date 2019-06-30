import {CST} from "../CST";
import {QuestionScene} from "./QuestionScene";
import {QUESTIONS} from "../../assets/Questions";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.GAME });
        GameScene.pacmanLives = 3;
    }

    init(config) {
        this.multiplayer = (config.multiplayer === true);
        this.playerName = config.playerName;
    }

    preload() {
        this.initStaticConfigurations();
        this.load.image('dot', 'dot.png');
        this.load.image('candy', 'candy.png');
        this.load.tilemapTiledJSON('map', 'pacman-map.json');
        this.load.image('tiles', 'pacman-tiles.png');
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('coin', 'coin.png', {frameWidth: 44, frameHeight: 40});
        this.load.audio('startMusic', ['start.mp3']);
        this.load.audio('eatDotMusic', ['chomp.mp3']);
        this.load.audio('questionMusic', ['question.mp3']);
        this.load.audio('eatGhostMusic', ['eatghost.mp3']);

        for (let ghost in this.ghosts) {
            this.load.spritesheet(ghost, ghost + '.png', {frameWidth: this.ghostWidth, frameHeight: this.ghostHeight});
        }

    }

    create() {
        if (this.multiplayer) {
            this.socket = io.connect('http://localhost:1235');
            this.manageSocket();
        }
        this.startMusic = this.sound.add('startMusic');
        this.eatDotMusic = this.sound.add('eatDotMusic');
        this.questionMusic = this.sound.add('questionMusic');
        this.eatGhostMusic = this.sound.add('eatGhostMusic');

        this.map = this.make.tilemap({key:'map'});
        const tileset = this.map.addTilesetImage('pacman-tiles', 'tiles');
        this.layer = this.map.createDynamicLayer('Pacman', tileset);
        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('pacman', { frames: [2, 1, 0, 1]}),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('pacman', { frames: [1]}),
            frameRate: 10,
            repeat: 1
        });
        this.initPacman('pacman', this.playerName, this);

        this.updateScore(this.pacman);

        this.input.keyboard.on('keydown', function (eventName, event) {
            switch (eventName.key) {
                case 'ArrowDown':   this.pacman.nextDirection = Phaser.DOWN;  break;
                case 'ArrowUp':     this.pacman.nextDirection = Phaser.UP;    break;
                case 'ArrowLeft':   this.pacman.nextDirection = Phaser.LEFT;  break;
                case 'ArrowRight':  this.pacman.nextDirection = Phaser.RIGHT; break;

                default: console.log('invalid button pressed: ' + eventName.key);
            }
            if (this.multiplayer) {
                this.socket.emit('updatePacmanNextDirection', this.pacman.nextDirection);
            }
        }, this);


        this.addGhosts(this);
        this.addGhostsCollideAction();
        this.addCoins();
        this.addCoinsCollideAction();
        if (!this.multiplayer) {
            this.drawLives();
            this.gameStarted = true;
            this.startMusic.play();
        }
    }

    update() {
        if (!this.gameStarted) return;

        /* if game is in "candy eaten" time */
        if (this.timeToEatAnswer && ++this.timeToEatAnswerCounter === this.timeToEatAnswerDelay) {
            if (--this.timeToEatAnswer === 0) {
                this.scene.stop(CST.SCENES.QUESTION);
                this.rightWrongText.text = '';
            }
            this.timeToEatAnswerCounter = 0;
        }

        this.updatePacman(this.pacman);
        if (this.multiplayer) {
            this.updatePacman(this.otherPacman);
        }
        if (!this.multiplayer || this.masterOrSlave === 'master') {
            this.updateGhosts();
        }
    }

    canMoveInDirection(x, y, direction) {
        var tile;
        switch (direction) {
            case Phaser.LEFT:
                tile = this.map.getTileAt(x-1, y, true);
                break;
            case Phaser.RIGHT:
                tile = this.map.getTileAt(x+1, y, true);
                break;
            case Phaser.UP:
                tile = this.map.getTileAt(x, y-1, true);
                break;
            case Phaser.DOWN:
                tile = this.map.getTileAt(x, y+1, true);
                break;
            default:
                console.log('invalid direction: ' + direction);
        }
        let tileIndex = tile === null ? -1 : tile.index;
        return (tileIndex === this.safeTile || tileIndex === this.dotTile);
    }

    updateDirection(gameObject, isGhost) {
        switch (gameObject.direction) {
            case Phaser.LEFT:
                if (isGhost) {
                    if (!this.timeToEatAnswer) {
                        gameObject.anims.stop();
                        gameObject.anims.play(gameObject.name + 'Left');
                    }
                } else {
                    gameObject.angle = 180;
                }
                gameObject.body.setVelocityX(isGhost ? -this.ghostSpeed : -this.speed);
                gameObject.body.setVelocityY(0);
                break;
            case Phaser.RIGHT:
                if (isGhost) {
                    if (!this.timeToEatAnswer) {
                        gameObject.anims.stop();
                        gameObject.anims.play(gameObject.name + 'Right');
                    }
                } else {
                    gameObject.angle = 0;
                }
                gameObject.body.setVelocityX(isGhost ? this.ghostSpeed : this.speed);
                gameObject.body.setVelocityY(0);
                break;
            case Phaser.UP:
                if (isGhost) {
                    if (!this.timeToEatAnswer) {
                        gameObject.anims.stop();
                        gameObject.anims.play(gameObject.name + 'Up');
                    }
                } else {
                    gameObject.angle = 270;
                }
                gameObject.body.setVelocityX(0);
                gameObject.body.setVelocityY(isGhost ? -this.ghostSpeed : -this.speed);
                break;
            case Phaser.DOWN:
                if (isGhost) {
                    if (!this.timeToEatAnswer) {
                        gameObject.anims.stop();
                        gameObject.anims.play(gameObject.name + 'Down');
                    }
                } else {
                    gameObject.angle = 90;
                }
                gameObject.body.setVelocityX(0);
                gameObject.body.setVelocityY(isGhost ? this.ghostSpeed : this.speed);
                break;
            default: console.log('updateDirection: invalid direction: ' + gameObject.direction);
        }
    }

    addCoins() {
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}),
            frameRate: 16,
            repeat: -1
        });
        for (let spot in this.coins) {
            this.coins[spot]['coin'] = this.add.sprite(GameScene.indexToPixel(this.coins[spot].x), GameScene.indexToPixel(this.coins[spot].y), 'coin', 0);
            this.physics.world.enable(this.coins[spot].coin);
            this.coins[spot]['coin'].setScale(0.5);
            this.coins[spot]['coin'].body.setSize(this.coinSize, this.coinSize);
            this.coins[spot]['coin'].anims.play('coin');
        }
    }

    iAteCandy(spot) {
        const questionIndex = this.randInt(0, QUESTIONS.length);
        if (this.multiplayer) {
            this.socket.emit('candy', {
                'questionIndex' : questionIndex,
                'spot'          : spot,
            });
        }
        this.candyEaten(spot, questionIndex);
    }

    candyEaten(spot, questionIndex) {
        this.coins[spot].coin.destroy();
        this.scene.launch(CST.SCENES.QUESTION, questionIndex);
        this.scene.pause();
        this.timeToEatAnswer = 14;
        for (let ghost in this.ghosts) {
            this.ghosts[ghost].ghost.anims.stop();
            this.ghosts[ghost].ghost.anims.play(ghost + 'Blue');
        }
        this.questionMusic.play();
        this.updateDirection(this.pacman, false);
    }

    addCoinsCollideAction() {
        for (let spot in this.coins) {
            this.physics.add.collider(this.pacman, this.coins[spot].coin, function() {
                this.iAteCandy(spot);
            }, null, this);
        }
    }

    static indexToPixel(index) {
        return index*16+8;
    }

    addGhosts(context) {
        for (let ghost in this.ghosts) {
            context.anims.create({
                key: ghost + 'Right',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [0,1]}),
                frameRate: 10,
                repeat: -1
            });
            context.anims.create({
                key: ghost + 'Left',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [2,3]}),
                frameRate: 10,
                repeat: -1
            });
            context.anims.create({
                key: ghost + 'Up',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [4,5]}),
                frameRate: 10,
                repeat: -1
            });
            context.anims.create({
                key: ghost + 'Down',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [6,7]}),
                frameRate: 10,
                repeat: -1
            });
            context.anims.create({
                key: ghost + 'Blue',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [8,9,0,1]}),
                frameRate: 10,
                repeat: -1
            });
            context.anims.create({
                key: ghost + 'Eaten',
                frames: context.anims.generateFrameNumbers(ghost, { frames: [10, 11, 12, 13, 14, 15]}),
                frameRate: 10,
                repeat: -1
            });
            context.ghosts[ghost].ghost = context.add.sprite(GameScene.indexToPixel(context.ghosts[ghost].startX), GameScene.indexToPixel(context.ghosts[ghost].startY), ghost, 0);
            context.ghosts[ghost].ghost.name = ghost;
            context.ghosts[ghost].ghost.setScale(1.5);
            context.ghosts[ghost].ghost.anims.play(ghost + 'Right');
            context.ghosts[ghost].ghost.direction = Phaser.RIGHT;
            context.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
            context.physics.add.collider(context.ghosts[ghost].ghost, context.layer);
            context.physics.world.enable(context.ghosts[ghost].ghost);
            context.ghosts[ghost].ghost.body.setSize(context.ghostSize, context.ghostSize);
            context.ghosts[ghost].ghost.body.setVelocityX(context.ghostSpeed);
        }
    }

    addGhostsCollideAction() {
        for (let ghost in this.ghosts) {
            this.physics.add.overlap(this.pacman, this.ghosts[ghost].ghost, function () {
                if (this.timeToEatAnswer) {
                    this.eatGhostMusic.play();
                    this.ghosts[ghost].ghost.setX(GameScene.indexToPixel(this.ghosts[ghost].startX));
                    this.ghosts[ghost].ghost.setY(GameScene.indexToPixel(this.ghosts[ghost].startY));
                    this.ghosts[ghost].ghost.anims.play(ghost + 'Right');
                    this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
                    this.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
                    this.updateDirection(this.ghosts[ghost].ghost, true);
                    if (GameScene.question.answers[this.ghosts[ghost].index] === GameScene.question.correctAnswer) {
                        this.rightWrongText.text = 'correct!';
                        this.pacman.score += GameScene.question.getCorrectAnswerPoints();
                    } else {
                        this.rightWrongText.text = 'wrong!';
                        this.pacman.score -= GameScene.question.getWrongAnswerPoints();
                    }
                } else {
                    if (!this.multiplayer) {
                        if (GameScene.getPacmanLives() === 1) {
                            alert('you have lost!');
                            GameScene.setPacmanLives(3);
                        } else {
                            GameScene.setPacmanLives(GameScene.getPacmanLives() - 1);
                        }
                        this.scene.restart();
                        /* commented for debug */
                    } else {
                        this.gameOver('lose');
                        this.socket.emit('gameOver', '');
                    }
                }
            }, null, this);
        }

    }

    static getPacmanLives() {
        return GameScene.pacmanLives;
    }
    static setPacmanLives(n) {
        GameScene.pacmanLives = n;
    }

    randInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min);
    }

    initStaticConfigurations() {
        this.textStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 30,
            color : "blue",
            width : 400
        };

        this.rightWrongTextStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 30,
            color : "white",
            width : 400
        };

        this.ghosts = {
            blinky: {
                index  : 0,
                startX : 13,
                startY : 11,
            },
            inky: {
                index  : 1,
                startX : 11,
                startY : 11,
            },
            pinky: {
                index  : 2,
                startX : 13,
                startY : 11,
            },
            clyde: {
                index  : 3,
                startX : 15,
                startY : 11,
            },
        };

        this.coins = {
            upperLeft : {
                x : 1,
                y : 3,
                direction : Phaser.LEFT,
            },
            upperRight : {
                x : 26,
                y : 3,
                direction : Phaser.LEFT,
            },
            lowerRight : {
                x : 26,
                y : 22,
                direction : Phaser.LEFT,
            },
            lowerLeft : {
                x : 1,
                y : 22,
                direction : Phaser.LEFT,
            },
        };

        this.gameStarted                 = false;
        this.textDistanceFromLeft        = 470;
        this.ghostHeight                 = 16;
        this.ghostWidth                  = 16;
        this.timeToEatAnswerDelay        = 30;
        this.timeToEatAnswerCounter      = 0;
        this.timeToEatAnswer             = 0;
        this.ghostCheckDirectionsDelay   = 11;
        this.ghostCheckDirectionsCounter = 0;
        this.safeTile                    = 14;
        this.dotTile                     = 7;
        this.ghostHouseTile              = 83;
        this.speed                       = 100;
        this.ghostSpeed                  = 70;
        this.pacmanSize                  = 12.5;
        this.ghostSize                   = 0.1;
        this.coinSize                    = 9;
        this.threshold                   = 2.05;
        this.ghostThreshold              = 1.9;
        this.dotCount                    = 0;
        this.numTotalDots                = 272;

        this.rightWrongText = this.add.text(180, 210, '', this.rightWrongTextStyle);
    }

    initPacman(pacmanName, playerName, context) {
        context[pacmanName] = context.add.sprite(GameScene.indexToPixel(14), GameScene.indexToPixel(17), 'pacman', 2);
        context[pacmanName].playerName = playerName;
        context[pacmanName].scoreText = this.add.text(pacmanName === 'otherPacman' ? 250 : 10,
            498, (context[pacmanName].playerName === '' ? 'score' : context[pacmanName].playerName) + ': 0' , this.textStyle);

        context[pacmanName].marker = new Phaser.Geom.Point();
        /* set collision for all tiles besides dots and empty tiles */
        context.layer.setCollisionByExclusion([context.safeTile,context.dotTile]);

        /* set collision between pacman and the layer */
        context.physics.add.collider(context[pacmanName], context.layer);

        context.physics.world.enable(context[pacmanName]);

        context[pacmanName].body.setVelocityX(100);

        context[pacmanName].body.setSize(context.pacmanSize,context.pacmanSize);

        context[pacmanName].anims.play('moving');
        context[pacmanName].direction     = Phaser.RIGHT;
        context[pacmanName].nextDirection = Phaser.RIGHT;
        context[pacmanName].score         = 0;
    }

    getOppositeDirection(direction) {
        switch (direction) {
            case Phaser.UP:
                return Phaser.DOWN;
            case Phaser.DOWN:
                return Phaser.UP;
            case Phaser.RIGHT:
                return Phaser.LEFT;
            case Phaser.LEFT:
                return Phaser.RIGHT;
            default:
                console.log('getOppositeDirection: invalid direction!');
                return Phaser.AUTO;
        }
    }

    getNextTile(currentTile, currentDirection, plane) {
        switch (currentDirection) {
            case Phaser.UP:
                return plane === 'X' ? currentTile : currentTile-1;
            case Phaser.DOWN:
                return plane === 'X' ? currentTile : currentTile+1;
            case Phaser.RIGHT:
                return plane === 'X' ? currentTile+1 : currentTile;
            case Phaser.LEFT:
                return plane === 'X' ? currentTile-1 : currentTile;
            default:
                console.log('getNextTile: invalid direction!');
                return Phaser.AUTO;
        }
    }

    gameOver(status) {
        if (status === 'win') {
            alert('you have won!');
        } else {
            alert('you have lost!');
        }
        this.scene.start(CST.SCENES.MENU);
        this.scene.stop(CST.SCENES.GAME);
    }

    dotEaten(x, y) {
        var tile = this.map.getTileAt(x, y, true);
        this.dotCount++;
        tile.index = this.safeTile;
        if (this.dotCount === this.numTotalDots) {
            this.gameOver('win');
        }
    }

    updatePacman(pacman) {
        const pacmanX = pacman.x;
        const pacmanY = pacman.y;

        pacman.marker.x = this.map.worldToTileX(pacmanX);
        pacman.marker.y = this.map.worldToTileY(pacmanY);

        const pacmanInCenterOfSquare = (Math.abs(pacmanX - GameScene.indexToPixel(pacman.marker.x)) < this.threshold) &&
                                       (Math.abs(pacmanY - GameScene.indexToPixel(pacman.marker.y)) < this.threshold);

        const pacmanCanTurn = this.canMoveInDirection(pacman.marker.x,
                                                      pacman.marker.y,
                                                      pacman.nextDirection);

        pacman.currentTile = this.map.getTileAt(pacman.marker.x, pacman.marker.y, true);

        if (pacman.currentTile.index === this.dotTile) {
            this.dotEaten(pacman.marker.x, pacman.marker.y);
            pacman.score++;
            this.eatDotMusic.play();
            this.updateScore(pacman);
        }

        if (pacman.nextDirection === pacman.direction && !pacmanCanTurn) {
            if (pacman.anims.isPlaying) {
                pacman.anims.stop();
                pacman.anims.play('stop');
            }
        } else {
            if (!pacman.anims.isPlaying) {
                 pacman.anims.play('moving');
            }
        }
        if (pacman.nextDirection !== pacman.direction && pacmanCanTurn && pacmanInCenterOfSquare) {
            pacman.direction = pacman.nextDirection;
            this.updateDirection(pacman, false);
        }
    }

    updateScore(pacman) {
        pacman.scoreText.text = (pacman.playerName === '' ? 'score' : pacman.playerName) + ': ' + pacman.score;
    }

    updateGhosts() {
        for (var ghost in this.ghosts) {
            const ghostX = this.ghosts[ghost].ghost.x;
            const ghostY = this.ghosts[ghost].ghost.y;

            this.ghosts[ghost].currentTileX = this.map.worldToTileX(ghostX);
            this.ghosts[ghost].currentTileY = this.map.worldToTileY(ghostY);

            const ghostInCenterOfSquare = (Math.abs(ghostX - GameScene.indexToPixel(this.ghosts[ghost].currentTileX)) < this.ghostThreshold) &&
                                          (Math.abs(ghostY - GameScene.indexToPixel (this.ghosts[ghost].currentTileY)) < this.ghostThreshold);

            if (ghostInCenterOfSquare                                                                       &&
                              this.ghosts[ghost].ghost.nextDirection !== this.ghosts[ghost].ghost.direction &&
                              this.canMoveInDirection(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, this.ghosts[ghost].ghost.nextDirection)) {
                if (this.multiplayer) {
                    this.socket.emit('ghostTurn', {
                        'ghost': ghost,
                        'direction': this.ghosts[ghost].ghost.nextDirection,
                        'x': this.ghosts[ghost].ghost.x,
                        'y': this.ghosts[ghost].ghost.y,
                    });
                }
                this.ghosts[ghost].ghost.direction = this.ghosts[ghost].ghost.nextDirection;
                this.updateDirection(this.ghosts[ghost].ghost, true);
            }
            if (this.timeToEatAnswer === 0) {
                this.updateDirection(this.ghosts[ghost].ghost, true);
            }
        }
        if (this.ghostCheckDirectionsCounter === this.ghostCheckDirectionsDelay) {
            for (var ghost in this.ghosts) {
                let ghostAvailableDirections = [];
                let nextTileX = this.getNextTile(this.ghosts[ghost].currentTileX, this.ghosts[ghost].ghost.direction, 'X');
                let nextTileY = this.getNextTile(this.ghosts[ghost].currentTileY, this.ghosts[ghost].ghost.direction, 'Y');
                let directions = [Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN];

                directions.forEach(function (direction) {
                    if (direction !== this.getOppositeDirection(this.ghosts[ghost].ghost.direction) &&
                        this.canMoveInDirection(nextTileX, nextTileY, direction)) {
                        ghostAvailableDirections.push(direction);
                    }
                }, this);

                if (ghostAvailableDirections.length) {
                    this.ghosts[ghost].ghost.nextDirection = ghostAvailableDirections[this.randInt(0, ghostAvailableDirections.length)];
                } else {
                    this.ghosts[ghost].ghost.nextDirection = this.getOppositeDirection(this.ghosts[ghost].ghost.direction);
                }
            }
            this.ghostCheckDirectionsCounter = 0;
        }
        this.ghostCheckDirectionsCounter++;
    }

    static setQuestion(question, answers, correctAnswer, difficulty) {
        GameScene.question = new Question(question, answers, correctAnswer, difficulty);
        console.log('correct answer: ' + GameScene.question.correctAnswer);
    }

    manageSocket() {
        var thisContext = this;
        this.socket.on('tooManyPlayers', function() {
            alert('too many players..');
            thisContext.scene.start(CST.SCENES.MENU);
            thisContext.scene.stop(CST.SCENES.GAME);
        });
        this.socket.on('wait', function() {
            /* i am the first player, wait for second */
            thisContext.scene.pause();
        });
        this.socket.on('startGame', function(masteOrSlave) {
            /* second player has connected, game can start */
            thisContext.masterOrSlave = masteOrSlave;
            thisContext.scene.resume(CST.SCENES.GAME);
            thisContext.initPacman('otherPacman', 'other player', thisContext);
            thisContext.gameStarted = true;
            thisContext.startMusic.play();
        });
        this.socket.on('dot', function(data) {
            thisContext.dotEaten(data.x, data.y);
        });
        this.socket.on('candy', function(data) {
            thisContext.candyEaten(data.spot, data.questionIndex);
        });
        this.socket.on('gameOver', function(data) {
            thisContext.gameOver(data);
        });
        this.socket.on('updatePacmanNextDirection', function(nextDirection) {
            thisContext.otherPacman.nextDirection = nextDirection;
        });
        this.socket.on('ghostTurn', function(data) {
            thisContext.ghosts[data.ghost].ghost.direction = data.direction;
            thisContext.ghosts[data.ghost].ghost.setX(data.x);
            thisContext.ghosts[data.ghost].ghost.setY(data.y);
            thisContext.updateDirection(thisContext.ghosts[data.ghost].ghost, true);
        });
    }

    drawLives() {
        for (var i=0; i<GameScene.getPacmanLives(); i++) {
            this.add.sprite(360 + i*32, 515, 'pacman', 1);
        }
    }

}

class Question {
    constructor(question, answers, correctAnswer, difficulty) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer= correctAnswer;
        this.difficulty = difficulty;
        this.points = { 'easy'   : 100,
                        'medium' : 200,
                        'hard'   : 400 };
    }

    getCorrectAnswerPoints() {
        return this.points[this.difficulty];
    }

    getWrongAnswerPoints() {
        return this.points[this.difficulty]/2;
    }
}
