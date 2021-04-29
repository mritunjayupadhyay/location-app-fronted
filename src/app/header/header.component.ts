import { AppComponent } from './../app.component';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  @Input() authToken: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
  }
}