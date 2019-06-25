import {CST} from "../CST";
import {GameScene} from "./GameScene";

export class InputNamesScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.INPUT_NAMES})
    }
    init(multiplayer) {
        this.multiplayer = (multiplayer === true);
    }
    preload() {
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.initStaticConfigurations();
    }
    create() {
        this.titleStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 90,
            color : "blue",
            bold : "true",
        };
        this.textStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 50,
            color : "blue",
        };
        this.playerName = '';
        this.basicEnterPlayerNameText = 'Enter player\'s name: ';
        this.add.text(this.distanceFromLeft, 40, (this.multiplayer ? 'Multi' : 'single') + '-player!', this.titleStyle);
        this.playerNameText = this.add.text(this.distanceFromLeft, this.distanceFromTop, this.basicEnterPlayerNameText , this.textStyle);
        this.add.text(this.distanceFromLeft, 400, 'back', this.textStyle);

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
                if (this.pacmanPointingAtPlayer === true) {
                    this.scene.start(CST.SCENES.GAME, {
                            'multiplayer' : this.multiplayer,
                            'playerName'  : this.playerName,
                        });
                } else {
                    this.scene.start(CST.SCENES.MENU);
                    this.scene.stop(CST.SCENES.INPUT_NAMES);
                }
            }
            switch (eventName.key) {
                case 'ArrowDown':
                    this.pacman.setY(425);
                    this.pacmanPointingAtPlayer = false;
                    break;
                case 'ArrowUp':
                    this.pacmanPointingAtPlayer = true;
                    this.pacman.setY(this.distanceFromTop + 28);
                    break;
                default:
                    break;
            }
            if (this.pacmanPointingAtPlayer) {
                if (eventName.key >= 'a' && eventName.key <= 'z' || eventName.key >= '1' && eventName.key <= '9') {
                    if (this.playerName.length < this.maxNameLength) {
                        this.playerName += eventName.key;
                        this.playerNameText.text = this.basicEnterPlayerNameText + this.playerName;
                    }
                } else if (eventName.key === 'Backspace') {
                    if (this.playerName.length) {
                        this.playerName = this.playerName.slice(0, -1);
                        this.playerNameText.text = this.basicEnterPlayerNameText + this.playerName;
                    }
                }
            }
        }, this);
    }
    initStaticConfigurations() {
        this.distanceFromLeft = 60;
        this.distanceFromTop = 250;
        this.textHeight = 70;
        this.pacmanPointingAtPlayer = true;
        this.maxNameLength = 6;
    }
}
