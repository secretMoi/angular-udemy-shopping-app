import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersonalLogs} from "../../shared/personalLogs";
import {catchError, throwError} from "rxjs";

interface AuthResponseData { // type de retour du post
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private personal: PersonalLogs
  ) {}

  signUp(email: string, password: string) {
    let signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.personal.apiKey;
    return this.httpClient.post<AuthResponseData>(
      signUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred';

      if(!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }

      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists';
      }

      return throwError(errorMessage);
    }))
  }
}
