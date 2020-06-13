import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: []
})
export class QuizComponent implements OnInit {

  questions: any[] = [];
  qCounter = 0;
  templCounter = 1;
  constructor(public quizService: QuizService, private router: Router ) {
    this.quizService.getQuestions().subscribe( (questions: any) => {
      console.log(questions);
      this.questions = questions;
    });
  }

  ngOnInit(): void {
  }

  answer(answerR: string){
    let isAnsCorr: boolean;

    if (this.questions[this.qCounter]['correct_answer'] === answerR){
      this.quizService.correctAnsw++;
      isAnsCorr = true;
    }else{
      isAnsCorr = false;
    }

    this.quizService.answers.push({
      question: this.questions[this.qCounter]['question'],
      answer: answerR,
      correctAnsw: this.questions[this.qCounter]['correct_answer'],
      isCorrect: isAnsCorr
    });
    console.log(this.quizService.answers);

    this.qCounter++;
    if (this.qCounter === 11){
      this.router.navigateByUrl('/results');
    }else{
      this.templCounter++;
    }
  }

}
