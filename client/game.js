import {GameScene} from "./scenes/GameScene.js"

let game = new Phaser.Game({
    width: 448,
    height: 496,
    scene : [
        GameScene
    ],
    physics: {
        default: 'arcade',
    }
});