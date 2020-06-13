import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {
  correctAnsw: number;
  constructor(public quizService: QuizService, private router: Router) {
    this.correctAnsw = this.quizService.correctAnsw;
  }

  ngOnInit(): void {
  }
  playAgain(){
    this.quizService.correctAnsw = 0;
    this.correctAnsw = 0;
    this.router.navigate(['/home']);
  }
}
