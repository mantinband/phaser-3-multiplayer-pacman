import {CST} from "../CST";
import {GameScene} from "./GameScene";

export class InputNamesScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.INPUT_NAMES})
    }
    init(multiplayer) {
        this.multiplayer = multiplayer === true;
    }
    preload() {
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.initStaticConfigurations();
    }
    create() {
        this.textStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 50,
            color : "blue",
        };
        this.namePlayer1 = '';
        this.basicTextPlayer1 = 'Enter player' + (this.multiplayer ? ' 1: ' : '\'s name: ');

        this.textPlayer1 = this.add.text(this.distanceFromLeft, this.distanceFromTop, this.basicTextPlayer1, this.textStyle);
        this.add.text(this.distanceFromLeft, 400, 'back', this.textStyle);

        if (this.multiplayer) {
            this.basicTextPlayer2 = 'Enter player 2: ';
            this.textPlayer2 = this.add.text(this.distanceFromLeft, this.textHeight + this.distanceFromTop, this.basicTextPlayer2, this.textStyle);
            this.namePlayer2 = '';
        }

        this.pacman = this.add.sprite(this.distanceFromLeft - 30, this.distanceFromTop + 28, 'pacman', 2);
        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('pacman', { frames: [2, 1, 0, 1]}),
            frameRate: 16,
            repeat: -1
        });
        this.pacman.setScale(1.5);
        this.pacman.anims.play('moving');

        this.input.keyboard.on('keydown', function (eventName, event) {
            if (eventName.key === 'Enter') {
                if (this.pacmanPointingAtPlayer === -1) {
                    this.multiplayer = false;
                    this.scene.start(CST.SCENES.MENU);
                    this.scene.stop(CST.SCENES.INPUT_NAMES);
                } else {
                    this.scene.start(CST.SCENES.GAME, {'multiplayer' : this.multiplayer, 'namePlayer1' : this.namePlayer1, 'namePlayer2' : this.namePlayer2});
                }
            }
            if (this.multiplayer) {
                switch (eventName.key) {
                    case 'ArrowDown':
                        switch (this.pacmanPointingAtPlayer) {
                            case 1:
                                this.pacmanPointingAtPlayer = 2;
                                this.pacman.setY(this.pacman.y + this.textHeight);
                                break;
                            case 2:
                                this.pacman.setY(425);
                                this.pacmanPointingAtPlayer = -1;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'ArrowUp':
                        switch (this.pacmanPointingAtPlayer) {
                            case 2:
                                this.pacmanPointingAtPlayer = 1;
                                this.pacman.setY(this.pacman.y - this.textHeight);
                                break;
                            case -1:
                                this.pacmanPointingAtPlayer = 2;
                                this.pacman.setY(this.distanceFromTop + 28 + this.textHeight);
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                switch (eventName.key) {
                    case 'ArrowDown':
                        this.pacman.setY(425);
                        this.pacmanPointingAtPlayer = -1;
                        break;
                    case 'ArrowUp':
                        this.pacmanPointingAtPlayer = 1;
                        this.pacman.setY(this.distanceFromTop + 28);
                        break;
                    default:
                        break;
                }
            }
            if (this.pacmanPointingAtPlayer !== -1) {
                if (eventName.key >= 'a' && eventName.key <= 'z' || eventName.key >= '1' && eventName.key <= '9') {
                    if (this.pacmanPointingAtPlayer === 1) {
                        if (this.namePlayer1.length < this.maxNameLength) {
                            this.namePlayer1 += eventName.key;
                            this.textPlayer1.text = this.basicTextPlayer1 + this.namePlayer1;
                        }
                    } else {
                        if (this.namePlayer2.length < this.maxNameLength) {
                            this.namePlayer2 += eventName.key;
                            this.textPlayer2.text = this.basicTextPlayer2 + this.namePlayer2;
                        }
                    }
                } else if (eventName.key === 'Backspace') {
                    if (this.pacmanPointingAtPlayer === 1) {
                        if (this.namePlayer1.length) {
                            this.namePlayer1 = this.namePlayer1.slice(0, -1);
                            this.textPlayer1.text = this.basicTextPlayer1 + this.namePlayer1;
                        }
                    } else {
                        if (this.namePlayer2.length) {
                            this.namePlayer2 = this.namePlayer2.slice(0, -1);
                            this.textPlayer2.text = this.basicTextPlayer2 + this.namePlayer2;
                        }
                    }
                }
            }
        }, this);
    }
    initStaticConfigurations() {
        this.distanceFromLeft = 60;
        this.distanceFromTop = 150;
        this.textHeight = 70;
        this.pacmanPointingAtPlayer = 1;
        this.maxNameLength = 6;
    }
}
