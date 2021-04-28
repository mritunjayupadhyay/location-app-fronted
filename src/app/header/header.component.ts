import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  authToken = '';
  subscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authTokenChanged.subscribe((token) => {
      this.authToken = token;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}