import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key= environment.api_key
  authResponse: AuthResponse;
  user = new BehaviorSubject<User|null>( null);

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  };

  

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  };

  autoLogin() {
    if(localStorage.getItem("user") == null) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    console.log(user);

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

    if(loadedUser.token) {
      this.user.next(loadedUser)
    }

  };

  logOut() {
    this.user.next(null);
    localStorage.removeItem("user");
  };

  private handleError(err: HttpErrorResponse) {
    let message = "Something is off!";

    if(err.error.error) {
      switch(err.error.error.message) {
        case "EMAIL_EXISTS":
          message = "This email already taken."
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Too many attempts please try again later."
          break;
        case "EMAIL_NOT_FOUND":
          message = "Email not found! If you don't register, you should be sign up and try again. "
          break;
        case "INVALID_PASSWORD":
          message = "Invalid password! Please revise your password and try again."
      }
    };

    return throwError(() => message);
  };

  private handleUser(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    
    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  };
}
