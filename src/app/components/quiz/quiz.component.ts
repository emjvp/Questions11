import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: []
})
export class QuizComponent implements OnInit {

  questions: any[] = [];
  error: boolean;
  loading: boolean;
  question: number;
  mensajeError: string;

  constructor(public quizService: QuizService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.loading = true;
    this.question = Number(this.activatedRoute.snapshot.paramMap.get('question'));
    if (this.quizService.getStorage('questions')){
      this.loading = false;
      this.questions = this.quizService.getStorage('questions');
      console.log(this.question);
      console.log(this.questions);
    }else{
        this.quizService.getQuestions().subscribe(
        (questions: any) => {

        this.loading = false;
        this.questions = questions;
        console.log(questions);
        this.quizService.loadStorage('questions', this.questions);
        },
        (err) => {
          console.log(err);
          this.mensajeError = err.error.error.message;
          this.loading = false;
          this.error = true;
        }
        );
    }
  }

  ngOnInit(): void {
  }

  answer(answerR: string){
    let isAnsCorr: boolean;

    if (this.questions[this.question]['correct_answer'] === answerR){

      isAnsCorr = true;
    }else{
      isAnsCorr = false;
    }
    if (this.quizService.getStorage('answers')){
      this.quizService.answers = this.quizService.getStorage('answers');
    }
    this.quizService.answers.push({
        question: this.questions[this.question]['question'],
        answer: answerR,
        correctAnsw: this.questions[this.question]['correct_answer'],
        isCorrect: isAnsCorr
    });

    console.log(this.quizService.answers);
    this.quizService.loadStorage('answers', this.quizService.answers);
    this.question++;
    if (this.question === 11){
      this.router.navigateByUrl('/results');
    }else{
      this.router.navigateByUrl(`/quiz/${this.question}`);
    }
  }
}
