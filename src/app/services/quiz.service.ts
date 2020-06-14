import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/Answers';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  answers: Answer[] = [];



  constructor(private http: HttpClient) {}

  getQuery(amount: number = 11, difficulty: string = 'hard', type: string = 'boolean' ){
    const API_URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    return this.http.get(API_URL);
  }
  getQuestions(){
    return this.getQuery()
                .pipe( map ( data => data['results']));
  }
  loadStorage(collection: string, data: any){
    localStorage.setItem(collection, JSON.stringify(data));
  }
  getStorage(collection: string){
    return JSON.parse(localStorage.getItem(collection));
  }
  clearStorage(){
    localStorage.clear();
  }
}
