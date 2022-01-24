import { Injectable } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/helpers/errorHandler.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(user:any):Observable<any>{
    return this.http.post<user>(environment.api + 'auth/login',user).pipe(
      retry(1),
      catchError(handleError),
    )
  }


}
