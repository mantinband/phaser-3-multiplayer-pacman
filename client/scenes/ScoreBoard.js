import {CST} from "../CST";

export class ScoreBoardScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.SCORE_BOARD})
    }

    create() {
      //  var v = '<%=HIGHSCORES %>';
        var v = document.getElementById('HiddenField1').value;
        console.log(v);
    }
}