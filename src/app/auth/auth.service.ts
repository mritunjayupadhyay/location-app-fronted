import { Register } from './register.model';
import { Login } from './login.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from './user.model';

import { environment } from '../../environments/environment';

const { baseUrl } = environment;
@Injectable({ providedIn: 'root' })
export class AuthService {
  authToken: string;
  userName: string;
  authTokenChanged = new Subject<string>();
  userNameChanged = new Subject<string>();
  completeLogin = new Subject<any>();
  completeRegister = new Subject<any>();

  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

  setAuthToken(authToken: string = '') {
    console.log("this authToken", authToken)
    if (authToken && authToken !== this.authToken) {
      this.authToken = authToken;
      localStorage.setItem('authToken', authToken);
      this.authTokenChanged.next(authToken);
    }
  }

  setUser(userName: string = '') {
    console.log("this username", userName)
    if (userName && userName !== this.userName) {
      this.userName = userName;
      localStorage.setItem('userName', userName);
      this.userNameChanged.next(userName);
    }
  }

  checkAuthToken() {
    console.log("Check auth token 1", this.authToken);
    const authToken = localStorage.getItem('authToken');
    this.setAuthToken(authToken);
  }

  checkUserName() {
    const userName = localStorage.getItem('userName');
    this.setUser(userName);
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
        this.setUser(user.name);
        this.setAuthToken(authToken);
      },
      ({ error = {} }) => {
        console.log("error loign", error);
        const { message } = error;
        // let errMsg: string;
        // if (typeof stack === 'string') {
        //   errMsg = stack;
        // } else {
        //   const { message = [] } = stack;
        //   const err = message[0] || '';
        //   errMsg = `Error: ${err}`;
        // }
        this.completeLogin.next(message);
      }
      );
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
        this.setUser(user.name);
        this.setAuthToken(authToken);
      },
      ({error = {}}) => {
        const { message, stack } = error;
        console.log("message, stack", message, stack, error)
        let errMsg: string;
        if (typeof stack === 'string' || stack === undefined) {
          errMsg = message;
        } else {
          const { message = [] } = stack;
          const err = message[0] || '';
          errMsg = `Error: ${err}`;
        }
        console.log("error for alert", errMsg);
        this.completeRegister.next(errMsg);
      }
      );
  }

  logout() {
    this.userName = '';
    this.authToken = '';
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    this.userNameChanged.next('');
    this.authTokenChanged.next('');
  }
}