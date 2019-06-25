import {GameScene} from "./scenes/GameScene.js"
import {QuestionScene} from "./scenes/QuestionScene.js"
import {MenuScene} from "./scenes/MenuScene.js"
import {InputNamesScene} from "./scenes/InputNamesScene";
import {ManageQuestions} from "./scenes/ManageQuestions";
import {ScoreBoardScene} from "./scenes/ScoreBoard";

let game = new Phaser.Game({
    width: 448*2,
    height: 496 + 40,
    scene : [
        MenuScene, InputNamesScene, GameScene, QuestionScene, ManageQuestions, ScoreBoardScene
    ],
    physics: {
        default: 'arcade',
    }
});
