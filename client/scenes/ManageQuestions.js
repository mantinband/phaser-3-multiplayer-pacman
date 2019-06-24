import {CST} from "../CST";
import {QUESTIONS} from "../../assets/Questions.js";

export class ManageQuestions extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.MANAGE_QUESTIONS})
    }

    create() {

        var question = prompt("Please enter a new question", "question");
        var difficuly = prompt("Please the question's difficulty (easy/medium/hard)", "difficulty");
        var correct = prompt("Please enter the correct answer", "answer");
        var wrong1 = prompt("Please enter wrong answer number 1", "wrong");
        var wrong2 = prompt("Please enter wrong answer number 2", "wrong");
        var wrong3 = prompt("Please enter wrong answer number 3", "wrong");
        if(difficuly==="easy"||difficuly==="medium" || difficuly==="hard") {
            alert("QUESTION ADDED SUCCESSFULLY!");
            this.addQuestion(question,difficuly,correct,wrong1,wrong2,wrong3);
        }
        else alert("Question not added. difficulty must be either easy, medium or hard");
    }

     addQuestion(q,d,c,w1,w2,w3){
        var tmp = {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": d,
            "question": q,
            "correct_answer": c,
            "incorrect_answers": [
                w1,
                w2,
                w3
            ]
        };
        QUESTIONS.push(tmp);
        console.log(QUESTIONS);
    }
    update(){
        this.scene.start(CST.SCENES.MENU);
    }
}
