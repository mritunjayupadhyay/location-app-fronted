import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  authToken;
  authTokenChanged = new Subject<string>();
  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(authToken) {
    if (authToken && authToken !== this.authToken) {
      this.authTokenChanged.next(authToken);
    }
  }

  checkAuthToken() {
    const authToken = localStorage.getItem('authToken');
    this.setAuthToken(authToken);
  }
}