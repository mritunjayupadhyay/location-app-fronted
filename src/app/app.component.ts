import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jagota-test-frontend';
  authToken = '';
  userName = '';
  constructor(private authSerive: AuthService) {}
  ngOnInit() {
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
}
