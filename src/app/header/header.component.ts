import { LocationService } from './../location/location.service';
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
  constructor(private authService: AuthService, private locationService: LocationService) {}

  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
  }

  addAddress() {
    this.locationService.onOpenAddLocationForm();
  }
}