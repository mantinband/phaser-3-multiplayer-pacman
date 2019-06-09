import {CST} from "../CST";

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
        this.safetile = 14;
        this.dottile = 7;
        this.speed = 100;
        this.pacmanSize = 13;
        this.threshold = 2.5;
        this.dotCount = 0;
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
        var tile;
        switch (this.nextDirection) {
            case Phaser.LEFT:
                tile = this.map.getTileAt(this.marker.x-1, this.marker.y, true).index;
                break;
            case Phaser.RIGHT:
                tile = this.map.getTileAt(this.marker.x+1, this.marker.y, true).index;
                break;
            case Phaser.UP:
                tile = this.map.getTileAt(this.marker.x, this.marker.y-1, true).index;
                break;
            case Phaser.DOWN:
                tile = this.map.getTileAt(this.marker.x, this.marker.y+1, true).index;
                break;
            default:
                console.log('invalid direction');
        }
        return tile === this.safetile || tile === this.dottile;
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
        const pacmanX = this.pacman.x;
        const pacmanY = this.pacman.y;

        this.marker.x = this.map.worldToTileX(pacmanX);
        this.marker.y = this.map.worldToTileY(pacmanY);

        this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

        if (this.currentTile.index === this.dottile) {
            this.dotCount++;
            console.log(this.dotCount);
            this.currentTile.index = this.safetile;
        }

        if (this.nextDirection === this.currentDirection && !this.canTurn()) {
            if (this.pacman.anims.isPlaying) {
                this.pacman.anims.stop();
                this.pacman.anims.play('stop');
            }
        } else {
            if (!this.pacman.anims.isPlaying) {
                this.pacman.anims.play('moving');
            }
        }
        if (this.nextDirection !== this.currentDirection && this.canTurn() &&
            (Math.abs(pacmanX - (this.marker.x*16+8)) < this.threshold) &&
            (Math.abs(pacmanY - (this.marker.y*16+8)) < this.threshold)){
            this.updateDirection();
        }
    }
}
