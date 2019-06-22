import {CST} from "../CST";
import {QuestionScene} from "./QuestionScene";
import {QUESTIONS} from "../../assets/Questions";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.GAME })
    }

    init(multiplayer) {
        this.multiplayer = multiplayer === true ? true : false;
        alert(this.multiplayer);
    }
    preload() {
        this.initStaticConfigurations();
        this.load.image('dot', 'dot.png');
        this.load.image('candy', 'candy.png');
        this.load.tilemapTiledJSON('map', 'pacman-map.json');
        this.load.image('tiles', 'pacman-tiles.png');
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('coin', 'coin.png', {frameWidth: 44, frameHeight: 40});

        for (let ghost in this.ghosts) {
            this.load.spritesheet(ghost, ghost + '.png', {frameWidth: this.ghostWidth, frameHeight: this.ghostHeight});
        }

    }

    create() {
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
        this.initPacman('pacman1');
        this.pacman1.scoreText = this.add.text(this.textDistanceFromLeft , 440, '' , this.textStyle);



        this.updateScore(this.pacman1);

        this.input.keyboard.on('keydown', function (eventName, event) {
            switch (eventName.key) {
                case 'ArrowDown':   this.pacman1.nextDirection = Phaser.DOWN;  break;
                case 'ArrowUp':     this.pacman1.nextDirection = Phaser.UP;    break;
                case 'ArrowLeft':   this.pacman1.nextDirection = Phaser.LEFT;  break;
                case 'ArrowRight':  this.pacman1.nextDirection = Phaser.RIGHT; break;

                default: console.log('invalid button pressed: ' + eventName.key);
            }
            if (this.multiplayer) {
                switch (eventName.key) {
                    case 'h': this.pacman2.nextDirection = Phaser.LEFT; break;
                    case 'l': this.pacman2.nextDirection = Phaser.RIGHT; break;
                    case 'j': this.pacman2.nextDirection = Phaser.DOWN; break;
                    case 'k': this.pacman2.nextDirection = Phaser.UP; break;
                    default: console.log('invalid button pressed: ' + eventName.key); }
            }
        }, this);

        if (this.multiplayer) {
            this.initPacman('pacman2');
            this.pacman2.scoreText = this.add.text(this.textDistanceFromLeft + 250 , 440, '' , this.textStyle);
            this.updateScore(this.pacman2);
            this.addCoinsCollideAction(this.pacman2);
            this.addGhostsCollideAction(this.pacman2);
        }

        this.addCoins();
        this.addCoinsCollideAction(this.pacman1);
        this.addGhosts();
        this.addGhostsCollideAction(this.pacman1);
    }

    update() {
        /* if game is in "candy eaten" time */
        if (this.timeToEatAnswer && ++this.timeToEatAnswerCounter === this.timeToEatAnswerDelay) {
            if (--this.timeToEatAnswer === 0) {
                this.scene.stop(CST.SCENES.QUESTION);
            }
            this.timeToEatAnswerCounter = 0;
        }

        this.updatePacman(this.pacman1);
        if (this.multiplayer) {
            this.updatePacman(this.pacman2);
        }
        this.updateGhosts();
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
                gameObject.body.setVelocityX(-this.speed);
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
                gameObject.body.setVelocityX(this.speed);
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
                gameObject.body.setVelocityY(-this.speed);
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
                gameObject.body.setVelocityY(this.speed);
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
            this.coins[spot]['coin'] = this.add.sprite((this.coins[spot].x * 16) + 8, (this.coins[spot].y * 16) + 8, 'coin', 0);
            this.physics.world.enable(this.coins[spot].coin);
            this.coins[spot]['coin'].setScale(0.5);
            this.coins[spot]['coin'].body.setSize(this.coinSize, this.coinSize);
            this.coins[spot]['coin'].anims.play('coin');
        }
    }

    addCoinsCollideAction(pacman) {
        for (let spot in this.coins) {
            this.physics.add.collider(pacman, this.coins[spot].coin, function () {
                this.coins[spot].coin.destroy();
                this.scene.launch(CST.SCENES.QUESTION, 'hello');
                this.scene.pause();
                this.timeToEatAnswer = 14;
                for (let ghost in this.ghosts) {
                    this.ghosts[ghost].ghost.anims.stop();
                    this.ghosts[ghost].ghost.anims.play(ghost + 'Blue');
                }
                this.updateDirection(pacman, false);
            }, null, this);
        }
    }

    static indexToPixel(index) {
        return index*16+8;
    }

    addGhosts() {
        for (let ghost in this.ghosts) {
            console.log(ghost+'Right');
            this.anims.create({
                key: ghost + 'Right',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [0,1]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: ghost + 'Left',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [2,3]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: ghost + 'Up',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [4,5]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: ghost + 'Down',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [6,7]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: ghost + 'Blue',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [8,9,0,1]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: ghost + 'Eaten',
                frames: this.anims.generateFrameNumbers(ghost, { frames: [10, 11, 12, 13, 14, 15]}),
                frameRate: 10,
                repeat: -1
            });
            this.ghosts[ghost].ghost = this.add.sprite(GameScene.indexToPixel(this.ghosts[ghost].startX), GameScene.indexToPixel(this.ghosts[ghost].startY), ghost, 0);
            this.ghosts[ghost].ghost.name = ghost;
            this.ghosts[ghost].ghost.setScale(1.5);
            this.ghosts[ghost].ghost.anims.play(ghost + 'Right');
            this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
            this.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
            this.physics.add.collider(this.ghosts[ghost].ghost, this.layer);
            this.physics.world.enable(this.ghosts[ghost].ghost);
            this.ghosts[ghost].ghost.body.setSize(this.ghostSize,this.ghostSize);
            this.ghosts[ghost].ghost.body.setVelocityX(100);
        }
    }

    addGhostsCollideAction(pacman) {
        for (let ghost in this.ghosts) {
            this.physics.add.overlap(pacman, this.ghosts[ghost].ghost, function () {
                if (this.timeToEatAnswer) {
                    this.ghosts[ghost].ghost.setX(GameScene.indexToPixel(this.ghosts[ghost].startX));
                    this.ghosts[ghost].ghost.setY(GameScene.indexToPixel(this.ghosts[ghost].startY));
                    this.ghosts[ghost].ghost.anims.play(ghost + 'Right');
                    this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
                    this.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
                    this.updateDirection(this.ghosts[ghost].ghost, true);
                    console.log(GameScene.question.answers[this.ghosts[ghost].index]);
                    if (GameScene.question.answers[this.ghosts[ghost].index] === GameScene.question.correctAnswer) {
                        alert('correct');
                        pacman.score += GameScene.question.getCorrectAnswerPoints();
                    } else {
                        alert('wrong');
                        pacman.score -= GameScene.question.getWrongAnswerPoints();
                    }
                } else {
                    alert('game over');
                    this.scene.restart();
                }
            }, null, this);
        }

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

        this.textDistanceFromLeft        = 480;
        this.ghostHeight                 = 16;
        this.ghostWidth                  = 16;
        this.timeToEatAnswerDelay        = 30;
        this.timeToEatAnswerCounter      = 0;
        this.timeToEatAnswer             = 0;
        this.ghostCheckDirectionsDelay   = 8;
        this.ghostCheckDirectionsCounter = 0;
        this.safeTile                    = 14;
        this.dotTile                     = 7;
        this.ghostHouseTile              = 83;
        this.speed                       = 100;
        this.pacmanSize                  = 12.5;
        this.ghostSize                   = 0.1;
        this.coinSize                    = 9;
        this.threshold                   = 2.05;
        this.ghostThreshold              = 1.9;
        this.dotCount                    = 0;
        this.numTotalDots                = 272;
        this.marker                      = new Phaser.Geom.Point();

    }

    initPacman(pacmanName) {
        this[pacmanName] = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 2);

        /* set collision for all tiles besides dots and empty tiles */
        this.layer.setCollisionByExclusion([this.safeTile,this.dotTile]);

        /* set collision between pacman and the layer */
        this.physics.add.collider(this[pacmanName], this.layer);

        this.physics.world.enable(this[pacmanName]);
        this[pacmanName].body.setVelocityX(100);
        this[pacmanName].body.setSize(this.pacmanSize,this.pacmanSize);

        this[pacmanName].anims.play('moving');
        this[pacmanName].direction     = Phaser.RIGHT;
        this[pacmanName].nextDirection = Phaser.RIGHT;
        this[pacmanName].score         = 0;
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

    updatePacman(pacman) {
        const pacmanX = pacman.x;
        const pacmanY = pacman.y;

        this.marker.x = this.map.worldToTileX(pacmanX);
        this.marker.y = this.map.worldToTileY(pacmanY);

        const pacmanInCenterOfSquare = (Math.abs(pacmanX - (this.marker.x*16+8)) < this.threshold) &&
                                       (Math.abs(pacmanY - (this.marker.y*16+8)) < this.threshold);

        const pacmanCanTurn = this.canMoveInDirection(this.marker.x,
                                                      this.marker.y,
                                                      pacman.nextDirection);

        this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

        if (this.currentTile.index === this.dotTile) {
            this.dotCount++;
            pacman.score++;
            this.updateScore(pacman);
            this.currentTile.index = this.safeTile;

            if (this.dotCount === this.numTotalDots) {
                alert('you have won!');
            }
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
        pacman.scoreText.text = 'Score: ' + pacman.score;
    }

    updateGhosts() {
        for (var ghost in this.ghosts) {
            const ghostX = this.ghosts[ghost].ghost.x;
            const ghostY = this.ghosts[ghost].ghost.y;

            this.ghosts[ghost].currentTileX = this.map.worldToTileX(ghostX);
            this.ghosts[ghost].currentTileY = this.map.worldToTileY(ghostY);

            const ghostInCenterOfSquare = (Math.abs(ghostX - (this.ghosts[ghost].currentTileX*16+8)) < this.ghostThreshold) &&
                                          (Math.abs(ghostY - (this.ghosts[ghost].currentTileY*16+8)) < this.ghostThreshold);

            if (ghostInCenterOfSquare                                                                       &&
                              this.ghosts[ghost].ghost.nextDirection !== this.ghosts[ghost].ghost.direction &&
                              this.canMoveInDirection(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, this.ghosts[ghost].ghost.nextDirection)) {
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
            this.ghostCheckDirectionsCounter=0;
        }
        this.ghostCheckDirectionsCounter++;
    }
    static setQuestion(question, answers, correctAnswer, difficulty) {
        GameScene.question = new Question(question, answers, correctAnswer, difficulty);
        console.log('correct answer: ' + GameScene.question.correctAnswer);
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
