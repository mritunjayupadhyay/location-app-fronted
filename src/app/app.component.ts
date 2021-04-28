import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jagota-test-frontend';
  authToken = '';
  userName = '';
  constructor(private authSerive: AuthService) {}
  ngOnInit(): void {
    this.authSerive.authTokenChanged.subscribe((token) => {
      this.authToken = token;
    });
    this.authSerive.userNameChanged.subscribe((name) => {
      this.userName = name;
    });
    this.authToken = this.authSerive.getAuthToken();
    this.authSerive.checkAuthToken();

    this.userName = this.authSerive.getUserName();
    this.authSerive.checkUserName();
  }

  ngOnDestroy(): void {
    this.authSerive.authTokenChanged.unsubscribe();
    this.authSerive.userNameChanged.unsubscribe();
  }
}
