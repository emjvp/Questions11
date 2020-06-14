import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { Answer } from '../../models/Answers';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {
  correctAnsw = 0;
  answers: Answer[] = [];
  constructor(private quizService: QuizService, private router: Router) {

    this.answers = this.quizService.getStorage('answers');

    console.log(this.answers.filter( answer => answer.isCorrect).length);
    this.correctAnsw = this.answers.filter( answer => answer.isCorrect).length;

  }

  ngOnInit(): void {
  }
  playAgain(){
    this.quizService.answers = [];
    this.quizService.clearStorage();
    this.router.navigate(['/home']);
  }
}
