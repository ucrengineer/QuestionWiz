import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { category } from 'src/app/models/category.model';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../error-handling/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  get():Observable<category[]>{
    return this.http.get<category[]>('assets/categories.json').pipe(
      retry(1),
      catchError(handleError)
    )

  }


  }

