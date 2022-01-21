import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/helpers/errorHandler.component';
import { quiz } from 'src/app/models/quiz.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService{

  constructor(private http:HttpClient) { }


  get(): Observable<quiz>{
    return this.http.get<quiz>(environment.api + 'quiz').pipe(
      retry(1),
      catchError(handleError)
    )
  }

}
