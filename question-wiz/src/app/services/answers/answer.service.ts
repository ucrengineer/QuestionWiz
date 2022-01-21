import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../helpers/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http : HttpClient) { }

  get():Observable<any[]> {
    return this.http.get<any[]>(environment.mocApi + 'answer').pipe(
      retry(1),
      catchError(handleError)
    )
  }
}
