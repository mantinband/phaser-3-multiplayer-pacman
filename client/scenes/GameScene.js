import {CST} from "../CST";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.GAME })
    }
    preload() {
        this.load.image('dot', 'dot.png');
        this.load.tilemapTiledJSON('map', 'pacman-map.json');
        this.load.image('tiles', 'pacman-tiles.png');
        this.load.spritesheet('pacman', 'pacman.png', {frameWidth: 32, frameHeight: 32});
        this.safetile = 14;
        this.dottile = 7;
        this.speed = 100;
        this.pacmanSize = 13;
        this.threshold = 3.5;
        this.marker = new Phaser.Geom.Point();

    }
    create() {
        this.map = this.make.tilemap({key:'map'});
        const tileset = this.map.addTilesetImage('pacman-tiles', 'tiles');
        this.layer = this.map.createDynamicLayer('Pacman', tileset);

        this.pacman = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 2);

        this.layer.setCollisionByExclusion([this.safetile,this.dottile]);

        this.physics.add.collider(this.pacman, this.layer);

        this.physics.world.enable(this.pacman);
        this.pacman.body.setVelocityX(100);
        this.pacman.body.setSize(this.pacmanSize,this.pacmanSize);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pacman', { frames: [0, 1, 2, 1]}),
            frameRate: 10,
            repeat: -1
        });
        this.pacman.anims.play('left');
        this.currentDirection = Phaser.RIGHT;
        this.nextDirection = Phaser.RIGHT;

        this.input.keyboard.on('keydown', function (eventName, event) {
            switch (eventName.key) {
                case 'ArrowDown': this.nextDirection = Phaser.DOWN; break;
                case 'ArrowUp': this.nextDirection = Phaser.UP; break;
                case 'ArrowLeft': this.nextDirection = Phaser.LEFT; break;
                case 'ArrowRight': this.nextDirection = Phaser.RIGHT; break;
                default: console.log('invalid button pressed: ' + eventName.key);
            }
        }, this);

    }

    canTurn() {
        const x = this.pacman.x;
        const y = this.pacman.y;
        this.marker.x = this.map.worldToTileX(x);
        this.marker.y = this.map.worldToTileY(y);

        if ((Math.abs(this.marker.x*16.5-x) < this.threshold) && (Math.abs(this.marker.y*16.5-y) < this.threshold)) {
        }
        var tile;
        switch (this.nextDirection) {
            case Phaser.LEFT:
                tile = this.map.getTileAt(this.marker.x-1, this.marker.y, true).index;
                if (Math.abs(this.marker.x*16.5-x) > this.threshold)  {
                    return false;
                }
                break;
            case Phaser.RIGHT:
                tile = this.map.getTileAt(this.marker.x+1, this.marker.y, true).index;
                if (Math.abs(this.marker.x*16.5-x) > this.threshold)  {
                    return false;
                }
                break;
            case Phaser.UP:
                tile = this.map.getTileAt(this.marker.x, this.marker.y-1, true).index;
                if (Math.abs(this.marker.y*16.5-y) > this.threshold) {
                    return false;
                }
                break;
            case Phaser.DOWN:
                tile = this.map.getTileAt(this.marker.x, this.marker.y+1, true).index;
                if (Math.abs(this.marker.y*16.5-y) > this.threshold) {
                    return false;
                }
                break;
            default:
                console.log('invalid direction');
        }
        return true;
    }

    updateDirection() {
        this.currentDirection = this.nextDirection;
        switch (this.currentDirection) {
            case Phaser.LEFT:
                this.pacman.angle = 180;
                this.pacman.body.setVelocityX(-this.speed);
                this.pacman.body.setVelocityY(0);
                break;
            case Phaser.RIGHT:
                this.pacman.angle = 0;
                this.pacman.body.setVelocityX(this.speed);
                this.pacman.body.setVelocityY(0);
                break;
            case Phaser.UP:
                this.pacman.angle = 270;
                this.pacman.body.setVelocityX(0);
                this.pacman.body.setVelocityY(-this.speed);
                break;
            case Phaser.DOWN:
                this.pacman.angle = 90;
                this.pacman.body.setVelocityX(0);
                this.pacman.body.setVelocityY(this.speed);
                break;
            default: console.log('invalid direction');
        }
    }

    update() {

        // if (this.nextDirection !== this.currentDirection && this.canTurn()) {
            this.updateDirection();
        // }
    }
}
