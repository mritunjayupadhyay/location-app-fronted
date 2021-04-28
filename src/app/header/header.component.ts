import { AppComponent } from './../app.component';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  authToken = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authTokenChanged.subscribe((token) => {
      this.authToken = token;
    });
  }

  ngOnDestroy(): void {
    this.authService.authTokenChanged.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}