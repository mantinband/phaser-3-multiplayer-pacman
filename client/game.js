import {GameScene} from "./scenes/GameScene.js"
import {QuestionScene} from "./scenes/QuestionScene.js"
import {MenuScene} from "./scenes/MenuScene.js"
import {InputNamesScene} from "./scenes/InputNamesScene";

let game = new Phaser.Game({
    width: 448*2,
    height: 496,
    scene : [
        MenuScene, InputNamesScene, GameScene, QuestionScene
    ],
    physics: {
        default: 'arcade',
    }
});
