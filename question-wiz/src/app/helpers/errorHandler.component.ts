
import { retry, catchError } from 'rxjs/operators';

import { throwError, Observable } from 'rxjs';
import { stringify } from 'querystring';

export function handleError(error){
  let errorMessage = {"client_side":null,"server_side":null};
  errorMessage.client_side = `Error: ${error.error}` ;
  errorMessage.server_side = `Error Code: ${error.status}\nMessage: ${error.message}`;



  window.alert(errorMessage.server_side);

  return throwError(errorMessage);

}
