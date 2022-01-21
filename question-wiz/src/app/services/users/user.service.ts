import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from '../../helpers/errorHandler.component';
import { user } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  get():Observable<user[]>{
    return this.http.get<user[]>(environment.mocApi + 'user').pipe(
      retry(1),
      catchError(handleError),

    )
  }

  put(user: user): Observable<any>{
    return this.http.post<user>(environment.api + 'User/create',user ).pipe(
      retry(1),
      catchError(handleError)
    )
  }




}
