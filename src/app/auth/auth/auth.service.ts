import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface AuthResponseData { // type de retour du post
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class AuthService {
  private apiKey: string = 'AIzaSyB1Og82cAbA_T9stZHDII51QsFLZfQHNsA';

  constructor(
    private httpClient: HttpClient
  ) {}

  signUp(email: string, password: string) {
    let signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey;
    return this.httpClient.post<AuthResponseData>(
      signUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
