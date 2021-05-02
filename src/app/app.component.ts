import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocationService } from './location/location.service';

import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'jagota-test-frontend';
  authToken: string = '';
  userName: string = '';
  subscriptionAuthToken: Subscription;
  subscriptionUserName: Subscription;

  constructor(private authService: AuthService, private locationService: LocationService) {}
  ngOnInit(): void {
    this.subscriptionAuthToken = this.authService.authTokenChanged.subscribe((token) => {
      this.authToken = token;
      this.locationService.fetchLocations();
    });
    this.subscriptionUserName = this.authService.userNameChanged.subscribe((name) => {
      this.userName = name;
    });
    this.authToken = this.authService.getAuthToken();
    this.authService.checkAuthToken();

    this.userName = this.authService.getUserName();
    this.authService.checkUserName();
  }

  // ngOnDestroy(): void {
  //   this.subscriptionAuthToken.unsubscribe();
  //   this.subscriptionUserName.unsubscribe();
  // }
}
