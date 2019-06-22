import {GameScene} from "./scenes/GameScene.js"
import {QuestionScene} from "./scenes/QuestionScene.js"
import {MenuScene} from "./scenes/MenuScene.js"

let game = new Phaser.Game({
    width: 448*2,
    height: 496,
    scene : [
        MenuScene, GameScene, QuestionScene
    ],
    physics: {
        default: 'arcade',
    }
});
