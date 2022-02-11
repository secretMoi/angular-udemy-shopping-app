import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PersonalLogs} from "../../shared/personalLogs";
import {catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData { // type de retour du post
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class AuthService {
  user = new Subject<User>()

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
    ).pipe(catchError(AuthService.handleError),
      tap(responseData => this.handleSignIn(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn,
      ))
    );
  }

  login(email: string, password: string) {
    let signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.personal.apiKey;
    return this.httpClient.post<AuthResponseData>(
      signInUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(AuthService.handleError));
  }

  private handleSignIn(email: string, userId: string, token: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }

    return throwError(errorMessage);
  }
}
