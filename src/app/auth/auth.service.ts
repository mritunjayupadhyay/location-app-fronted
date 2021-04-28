import { Register } from './register.model';
import { Login } from './login.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { baseUrl } from '../config';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authToken;
  user;
  authTokenChanged = new Subject<string>();
  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(authToken) {
    if (authToken && authToken !== this.authToken) {
      localStorage.setItem('authToken', authToken);
      this.authTokenChanged.next(authToken);
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  checkAuthToken() {
    const authToken = localStorage.getItem('authToken');
    this.setAuthToken(authToken);
  }

  login({ email, password}: Login) {
    const loginObj = { email, password };
    this.http
      .post<{ error: boolean, message?: string, data?: {authToken: string, user: User} }>(
        `${baseUrl}/login`,
        loginObj
      )
      .subscribe(response => {
        const { error, data, message = '' } = response;
        if (error === true) {
          alert(`Error: ${message}`);
          return;
        }
        const { authToken, user } = data;
        this.setUser(user);
        this.setAuthToken(authToken);
      });
  }

  register({ email, password, name}: Register) {
    const registerObj = { email, password, name };
    this.http
      .post<{ error: boolean, message?: string, data?: {authToken: string, user: User} }>(
        `${baseUrl}/register`,
        registerObj
      )
      .subscribe(response => {
        console.log("register", response);
        const { error, data, message = '' } = response;
        if (error === true) {
          alert(`Error: ${message}`);
          return;
        }
        const { authToken, user } = data;
        this.setUser(user);
        this.setAuthToken(authToken);
      });
  }
}