import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.play();
  }

  playerChoose(value: string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected  = this.questions[this.questionIndex];
    }else {
      this.finished = true;
      const finalAnswer:string = await this.checkResult(this.answers);
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results];

    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length ) {
        return previous;
      }
      return current;
    })
    return result;
  }

  play() {
    if(quiz_questions){
      this.questionIndex = 0;
      this.answers = [];

      this.finished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = quiz_questions.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

}
