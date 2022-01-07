
import { retry, catchError } from 'rxjs/operators';

import { throwError, Observable } from 'rxjs';

export function handleError(error){
  let errorMessage = '';

  if (error.error instanceof ErrorEvent) {

    // client-side error

    errorMessage = `Error: ${error.error.message}` ;

  } else {

    // server-side error

    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

  }

  window.alert(errorMessage);

  return throwError(errorMessage);

}
