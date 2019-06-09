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
        this.load.spritesheet('coin', 'coin.png', {frameWidth: 44, frameHeight: 40});

        this.ghosts= [ 'blinky', 'clyde', 'inky', 'pinky'];

        this.ghostHeight = 16;
        this.ghostWidth = 16;
        for (var i=0; i<this.ghosts.length; i++) {
            this.load.spritesheet(this.ghosts[i], this.ghosts[i] + '.png', {frameWidth: this.ghostWidth, frameHeight: this.ghostHeight});
        }

        this.safetile       = 14;
        this.dottile        = 7;
        this.speed          = 100;
        this.pacmanSize     = 12.5;
        this.coinSize       = 12;
        this.threshold      = 2.05;
        this.dotCount       = 0;
        this.numTotalDots   = 272;
        this.marker         = new Phaser.Geom.Point();

        this.coins = {
            upperLeft : {
                x : 1,
                y : 3
            },
            upperRight : {
                x : 26,
                y : 3
            },
            lowerRight : {
                x : 26,
                y : 22
            },
            lowerLeft : {
                x : 1,
                y : 22
            },
        };
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

        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}),
            frameRate: 16,
            repeat: -1
        });
        this.addCoins();
        this.addCoinsCollideAction();
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

        const pacmanInCenterOfSquare = (Math.abs(pacmanX - (this.marker.x*16+8)) < this.threshold) &&
                                       (Math.abs(pacmanY - (this.marker.y*16+8)) < this.threshold);

        const pacmanCanTurn = this.canTurn();

        this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

        if (this.currentTile.index === this.dottile) {
            this.dotCount++;
            this.currentTile.index = this.safetile;
            console.log(this.dotCount);

            if (this.dotCount === this.numTotalDots) {
                alert('you have won!');
            }
        }

        if (this.nextDirection === this.currentDirection && !pacmanCanTurn) {
            if (this.pacman.anims.isPlaying) {
                this.pacman.anims.stop();
                this.pacman.anims.play('stop');
            }
        } else {
            if (!this.pacman.anims.isPlaying) {
                this.pacman.anims.play('moving');
            }
        }
        if (this.nextDirection !== this.currentDirection && pacmanCanTurn && pacmanInCenterOfSquare) {
            this.updateDirection();
        }
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
            }, null, this);
        }
    }
}
