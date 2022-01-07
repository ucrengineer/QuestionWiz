import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../error-handling/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http : HttpClient) { }

  get():Observable<any[]>{
    return this.http.get<any[]>('assets/countries.json').pipe(
      retry(1),
      catchError(handleError)
    )
  }
}
