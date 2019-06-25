import {CST} from "../CST";
import {InputNamesScene} from "./GameScene";

const OPTIONS = {
     SINGLE_PLAYER    : 1,
     MULTI_PLAYER     : 2,
     MANAGE_QUESTIONS : 3
};

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.MENU})
    }
    preload() {
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('zebra', 'zebras.png', {frameWidth: 80, frameHeight: 80});
        this.initStaticConfigurations();
    }
    create() {
        this.textStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 50,
            color : "blue",
        };
        this.titleStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 90,
            color : "blue",
            bold : "true",
        };
        /* add menu options to screen */
        this.add.text(this.distanceFromLeft - 10, 40, 'MENU' , this.titleStyle);
        this.add.text(this.distanceFromLeft, this.distanceFromTop, 'single player' , this.textStyle);
        this.add.text(this.distanceFromLeft, this.distanceFromTop + this.textHeight, 'multi player' , this.textStyle);
        this.add.text(this.distanceFromLeft, this.distanceFromTop + 2*this.textHeight, 'add questions' , this.textStyle);

        /* add the moving pacman */
        this.pacman = this.add.sprite(this.distanceFromLeft - 30, this.distanceFromTop + 28, 'pacman', 2);
        this.zebra = this.add.sprite(448*2, 496, 'zebra', 0);

        this.anims.create({
            key: 'pacmanMoving',
            frames: this.anims.generateFrameNumbers('pacman', { frames: [2, 1, 0, 1]}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'zebraMovingLeft',
            frames: this.anims.generateFrameNumbers('zebra', { frames: [4, 5, 6, 7]}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'zebraMovingRight',
            frames: this.anims.generateFrameNumbers('zebra', { frames: [8, 9, 10, 11]}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'zebraButt',
            frames: this.anims.generateFrameNumbers('zebra', { frames: [12, 13, 14, 15]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'zebraFace',
            frames: this.anims.generateFrameNumbers('zebra', { frames: [0, 1, 2, 3]}),
            frameRate: 8,
            repeat: -1
        });
        this.pacman.anims.play('pacmanMoving');
        this.zebra.anims.play('zebraMovingLeft');
        this.physics.world.enable(this.zebra);
        this.zebra.body.setVelocityX(-85);

        this.pacman.setScale(1.5);

        this.input.keyboard.on('keydown', function (eventName, event) {
            switch (eventName.key) {
                case 'ArrowDown':
                    if (this.option < 3) {
                        this.pacman.setY(this.pacman.y + this.textHeight);
                        this.option++;
                    }
                    break;
                case 'ArrowUp':
                    if (this.option > 1) {
                        this.pacman.setY(this.pacman.y - this.textHeight);
                        this.option--;
                    }
                    break;
                case 'Enter':
                    switch (this.option) {
                        case OPTIONS.SINGLE_PLAYER:
                            this.scene.start(CST.SCENES.INPUT_NAMES, 0xdc);
                            break;
                        case OPTIONS.MULTI_PLAYER:
                            this.scene.start(CST.SCENES.INPUT_NAMES, true);
                            break;
                        case OPTIONS.MANAGE_QUESTIONS:
                            this.scene.start(CST.SCENES.MANAGE_QUESTIONS);
                            break;
                        default:
                            console.log('option ' + this.option + ' not yet supported')
                    }
                    break;
                default:
                    console.log('invalid button pressed: ' + eventName.key);
            }
        }, this);
    }
    initStaticConfigurations() {
        this.distanceFromLeft = 300;
        this.distanceFromTop = 210;
        this.textHeight = 70;
        this.option = 1;
    }
    update() {
        if (this.zebra.x <= 20 && this.zebra.y >= 490) {
            this.zebra.anims.play('zebraButt');
            this.zebra.body.setVelocityX(0);
            this.zebra.body.setVelocityY(-85);
            return;
        }
        if (this.zebra.x <= 20 && this.zebra.y <= 20) {
            this.zebra.anims.play('zebraMovingRight');
            this.zebra.body.setVelocityX(85);
            this.zebra.body.setVelocityY(0);
            return;
        }
        if (this.zebra.x <= 20 && this.zebra.y <= 20) {
            this.zebra.anims.play('zebraMovingRight');
            this.zebra.body.setVelocityX(85);
            this.zebra.body.setVelocityY(0);
            return;
        }
        if (this.zebra.x >= 448*2 - 30 && this.zebra.y <= 20) {
            this.zebra.anims.play('zebraFace');
            this.zebra.body.setVelocityX(0);
            this.zebra.body.setVelocityY(85);
            return;
        }
        if (this.zebra.x >= 448*2 - 30 && this.zebra.y >= 490) {
            this.zebra.anims.play('zebraMovingLeft');
            this.zebra.body.setVelocityX(-85);
            this.zebra.body.setVelocityY(0);
        }
    }
}
