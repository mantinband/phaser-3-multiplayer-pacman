import {CST} from "../CST";
import {QUESTIONS} from "../../assets/Questions.js";

export class QuestionScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.QUESTION})
    }

    preload() {
        this.ghosts=[ 'blinky', 'clyde', 'inky', 'pinky'];

        this.ghostHeight = 16;
        this.ghostWidth = 16;

        for (var i=0; i<this.ghosts.length; i++) {
            this.load.spritesheet(this.ghosts[i], this.ghosts[i] + '.png', {frameWidth: this.ghostWidth, frameHeight: this.ghostHeight});
        }
    }
    create() {
        this.questionIndex = this.randInt(0, QUESTIONS.length);
        this.textStyle = {
            fontFamily: '"Roboto Condensed"',
            fontSize : 30,
            color : "blue",
            width : 400
        };
        this.question = QUESTIONS[this.questionIndex].question;

        this.printingQuestion = true;
        this.printingAnswer = -1;
        this.distanceFromLeft = 480;
        this.text = this.add.text(this.distanceFromLeft, 50, '' , this.textStyle);
        this.i = 0;
        this.delay = 3;
        this.delayCount = 0;
        this.lettersPerLine = 25;
        this.answers = [QUESTIONS[this.questionIndex].correct_answer,
                        QUESTIONS[this.questionIndex].incorrect_answers[0],
                        QUESTIONS[this.questionIndex].incorrect_answers[1],
                        QUESTIONS[this.questionIndex].incorrect_answers[2],
        ];
        this.shuffleArray(this.answers);
        for (var i=0; i<this.ghosts.length; i++) {
            this.anims.create({
                key: this.ghosts[i] + 'Animation',
                frames: this.anims.generateFrameNumbers(this.ghosts[i], { frames: [6, 7, 6, 7, 6, 7, 0, 1, 0, 1, 6, 7, 2, 3, 2, 3, 6, 7, 8, 9, 8, 9]}),
                frameRate: 7,
                repeat: -1
            });
            this.add.sprite(this.distanceFromLeft + 20, 270 + i*(this.ghostHeight*3+5), this.ghosts[i], 0).anims.play(this.ghosts[i] + 'Animation').setScale(3);
        }
        this.events.on('resume', function () {
            alert('i have been resumed!');
        });
    }
    update() {
        if (++this.delayCount === this.delay) {
            if (this.printingQuestion) {
                this.text.text += this.question[this.i];
                this.i++;
                if (!(this.i % this.lettersPerLine)) {
                    this.text.text += '\n';
                }
                if (this.question[this.i] === undefined) {
                    this.printingQuestion = false;
                    this.printingAnswer = 1;
                }
            } else { //print answer
                if (this.printingAnswer <= 4) {
                    this.add.text(this.distanceFromLeft + this.ghostWidth*3 + 10,
                        270 + (this.printingAnswer-1)*(this.ghostHeight*3+5) -10, this.answers[this.printingAnswer-1], this.textStyle);
                }
                this.printingAnswer++;
                if (this.printingAnswer === 40) {
                    this.scene.resume(CST.SCENES.GAME);
                }
            }
            this.delayCount = 0;
        }
    }

    randInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min);
    }

    shuffleArray(array) {
        for (var i=0; i<100; i++) {
            var indexI = this.randInt(0, array.length-1);
            var indexJ = this.randInt(0, array.length-1);
            var tmp = array[indexI];
            array[indexI] = array[indexJ];
            array[indexJ] = tmp
        }
    }
}
