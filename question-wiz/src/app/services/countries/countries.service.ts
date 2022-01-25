import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../helpers/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http : HttpClient) { }

  get():Promise<any[]>{
    return this.http.get<any[]>('assets/countries.json').pipe(
      retry(1),
      catchError(handleError)
    ).toPromise()
  }

}
