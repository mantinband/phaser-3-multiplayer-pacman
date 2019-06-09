import {CST} from "../CST";
import {QuestionScene} from "./QuestionScene";
import {QUESTIONS} from "../../assets/Questions";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.GAME })
    }
    preload() {
        this.load.image('dot', 'dot.png');
        this.load.image('candy', 'candy.png');
        this.load.tilemapTiledJSON('map', 'pacman-map.json');
        this.load.image('tiles', 'pacman-tiles.png');
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('coin', 'coin.png', {frameWidth: 44, frameHeight: 40});

        this.ghosts = {
            blinky: {
                startX : 13,
                startY : 11,
            },
            inky: {
                startX : 11,
                startY : 11,
            },
            pinky: {
                startX : 13,
                startY : 11,
            },
            clyde: {
                startX : 15,
                startY : 11,
            },
        };

        this.ghostHeight = 16;
        this.ghostWidth = 16;

        for (let ghost in this.ghosts) {
            this.load.spritesheet(ghost, ghost + '.png', {frameWidth: this.ghostWidth, frameHeight: this.ghostHeight});
        }

        this.timeToEatAnswerDelay   = 30;
        this.timeToEatAnswerCounter = 0;
        this.timeToEatAnswer        = 0;
        this.safeTile        = 14;
        this.dotTile         = 7;
        this.ghostHouseTile  = 83;
        this.speed           = 100;
        this.pacmanSize      = 12.5;
        this.ghostSize       = 1;
        this.coinSize        = 12;
        this.threshold       = 2.05;
        this.dotCount        = 0;
        this.numTotalDots    = 272;
        this.marker          = new Phaser.Geom.Point();

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
    }

    create() {
        this.map = this.make.tilemap({key:'map'});
        const tileset = this.map.addTilesetImage('pacman-tiles', 'tiles');
        this.layer = this.map.createDynamicLayer('Pacman', tileset);

        this.pacman = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 2);

        this.layer.setCollisionByExclusion([this.safeTile,this.dotTile]);

        this.physics.add.collider(this.pacman, this.layer);

        this.physics.world.enable(this.pacman);
        this.pacman.body.setVelocityX(100);
        this.pacman.body.setSize(this.pacmanSize,this.pacmanSize);


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

        this.pacman.anims.play('moving');
        this.pacman.direction = Phaser.RIGHT;
        this.pacman.nextDirection = Phaser.RIGHT;

        this.input.keyboard.on('keydown', function (eventName, event) {
            switch (eventName.key) {
                case 'ArrowDown':   this.pacman.nextDirection = Phaser.DOWN; break;
                case 'ArrowUp':     this.pacman.nextDirection = Phaser.UP; break;
                case 'ArrowLeft':   this.pacman.nextDirection = Phaser.LEFT; break;
                case 'ArrowRight':  this.pacman.nextDirection = Phaser.RIGHT; break;
                default: console.log('invalid button pressed: ' + eventName.key);
            }
        }, this);

        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}),
            frameRate: 16,
            repeat: -1
        });
        this.addCoins();
        this.addCoinsCollideAction();
        this.addGhosts();
        this.addGhostsCollideAction();
    }

    canTurn(x, y, direction, isGhost) {
        var tile;
        switch (direction) {
            case Phaser.LEFT:
                tile = this.map.getTileAt(x-1, y, true).index;
                break;
            case Phaser.RIGHT:
                tile = this.map.getTileAt(x+1, y, true).index;
                break;
            case Phaser.UP:
                tile = this.map.getTileAt(x, y-1, true).index;
                break;
            case Phaser.DOWN:
                tile = this.map.getTileAt(x, y+1, true).index;
                break;
            default:
                console.log('invalid direction: ' + direction);
        }
        return (tile === this.safeTile || tile === this.dotTile) || (isGhost && tile === this.ghostHouseTile);
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
;
        }
    }

    update() {
        if (this.timeToEatAnswer && ++this.timeToEatAnswerCounter === this.timeToEatAnswerDelay) {
            if (--this.timeToEatAnswer === 0) {
                this.scene.stop(CST.SCENES.QUESTION);
            }
            this.timeToEatAnswerCounter = 0;
        }

        const pacmanX = this.pacman.x;
        const pacmanY = this.pacman.y;

        this.marker.x = this.map.worldToTileX(pacmanX);
        this.marker.y = this.map.worldToTileY(pacmanY);

        const pacmanInCenterOfSquare = (Math.abs(pacmanX - (this.marker.x*16+8)) < this.threshold) &&
                                       (Math.abs(pacmanY - (this.marker.y*16+8)) < this.threshold);

        const pacmanCanTurn = this.canTurn(this.marker.x,
                                           this.marker.y,
                                           this.pacman.nextDirection,
                                           false);

        this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

        if (this.currentTile.index === this.dotTile) {
            this.dotCount++;
            this.currentTile.index = this.safeTile;

            if (this.dotCount === this.numTotalDots) {
                alert('you have won!');
            }
        }

        if (this.pacman.nextDirection === this.pacman.direction && !pacmanCanTurn) {
            if (this.pacman.anims.isPlaying) {
                this.pacman.anims.stop();
                this.pacman.anims.play('stop');
            }
        } else {
            if (!this.pacman.anims.isPlaying) {
                this.pacman.anims.play('moving');
            }
        }
        if (this.pacman.nextDirection !== this.pacman.direction && pacmanCanTurn && pacmanInCenterOfSquare) {
            this.pacman.direction = this.pacman.nextDirection;
            this.updateDirection(this.pacman, false);
        }
        this.updateGhosts();
    }

    addCoins() {
        for (let spot in this.coins) {
            this.coins[spot]['coin'] = this.add.sprite((this.coins[spot].x * 16) + 8, (this.coins[spot].y * 16) + 8, 'coin', 0);
            this.physics.world.enable(this.coins[spot].coin);
            this.coins[spot]['coin'].setScale(0.5);
            this.coins[spot]['coin'].body.setSize(this.coinSize, this.coinSize);
            this.coins[spot]['coin'].anims.play('coin');
        }
    }

    addCoinsCollideAction() {
        for (let spot in this.coins) {
            this.physics.add.collider(this.pacman, this.coins[spot].coin, function () {
                this.coins[spot].coin.destroy();
                this.scene.launch(CST.SCENES.QUESTION);
                this.scene.pause();
                this.timeToEatAnswer = 10;
                for (let ghost in this.ghosts) {
                    this.ghosts[ghost].ghost.anims.stop();
                    this.ghosts[ghost].ghost.anims.play(ghost + 'Blue');
                }
            }, null, this);
        }
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
            this.ghosts[ghost].ghost = this.add.sprite(this.ghosts[ghost].startX*16+8, this.ghosts[ghost].startY*16+8, ghost, 0);
            this.ghosts[ghost].ghost.name = ghost;
            this.physics.world.enable(this.ghosts[ghost].ghost);
            this.ghosts[ghost].ghost.setScale(1.5);
            this.ghosts[ghost].ghost.anims.play(ghost + 'Left');
            this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
            this.physics.add.collider(this.ghosts[ghost].ghost, this.layer);
            this.ghosts[ghost].ghost.body.setSize(this.ghostSize,this.ghostSize);
            this.ghosts[ghost].ghost.body.setVelocityX(100);
        }
    }

    addGhostsCollideAction() {
        for (let ghost in this.ghosts) {
            this.physics.add.collider(this.pacman, this.ghosts[ghost].ghost, function () {
                if (this.timeToEatAnswer) {
                    /* TODO: need to bring answer array, and correct answer from question scene */
                    // const answers = QuestionScene.answers;
                    // const correctAnswer = QUESTIONS[QuestionScene.questionIndex].correct_answer;
                    // switch (this.ghosts[ghost].ghost.name) {
                    //     case 'blinky':
                    //         alert((answers[0] === correctAnswer) ? 'correct!' : "incorrect!");
                    //         break;
                    //     case 'clyde' :
                    //         alert((answers[1] === correctAnswer) ? 'correct!' : "incorrect!");
                    //         break;
                    //     case 'inky'  :
                    //         alert((answers[2] === correctAnswer) ? 'correct!' : "incorrect!");
                    //         break;
                    //     case 'pinky' :
                    //         alert((answers[3] === correctAnswer) ? 'correct!' : "incorrect!");
                    //         break;
                    // }
                } else {
                    alert('game over');
                }
            }, null, this);
        }

    }

    updateGhosts() {
        for (var ghost in this.ghosts) {
            const ghostX = this.ghosts[ghost].ghost.x;
            const ghostY = this.ghosts[ghost].ghost.y;

            this.ghosts[ghost].currentTileX = this.map.worldToTileX(ghostX);
            this.ghosts[ghost].currentTileY = this.map.worldToTileY(ghostY);

            const ghostInCenterOfSquare = (Math.abs(ghostX - (this.ghosts[ghost].currentTileX*16+8)) < this.threshold) &&
                                          (Math.abs(ghostY - (this.ghosts[ghost].currentTileY*16+8)) < this.threshold);
            /* if reached wall*/
            if (ghostInCenterOfSquare && !this.canTurn(this.ghosts[ghost].currentTileX,
                                                       this.ghosts[ghost].currentTileY,
                                                       this.ghosts[ghost].ghost.direction,
                                                       true)) {
                let ghostAvailableDirections = [];
                let direction = [Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN];

                direction.forEach(function(direction) {
                    if (this.canTurn(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, direction, true)) {
                        ghostAvailableDirections.push(direction);
                    }
                }, this);
                this.ghosts[ghost].ghost.direction = ghostAvailableDirections[this.randInt(0, ghostAvailableDirections.length)];
                this.updateDirection(this.ghosts[ghost].ghost, true);
            }
        }
    }

    randInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min);
    }
}
