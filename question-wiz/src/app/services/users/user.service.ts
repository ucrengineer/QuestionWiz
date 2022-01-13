import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../helpers/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  get():Observable<any[]>{
    return this.http.get<any[]>(environment.api + 'user').pipe(
      retry(1),
      catchError(handleError)
    )
  }

  put(user: any): Observable<any>{
    return this.http.post<any>(environment.api + 'user',user ).pipe(
      retry(1),
      catchError(handleError)
    )
  }

  login(user:any):Observable<any>{
    return this.http.post<any>(environment.api + 'auth/login',user).pipe(
      retry(1),
      catchError(handleError)
    )
  }



}
