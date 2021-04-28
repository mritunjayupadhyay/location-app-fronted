import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from './../location.service';
import { Location } from './../location.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: Location[];
  subscription: Subscription;
  subscriptionAuthToken: Subscription;

  constructor(private locationService: LocationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.locationService.locationsChanged
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        }
      );
      this.subscriptionAuthToken = this.authService.authTokenChanged.subscribe((token) => {
        this.locationService.fetchLocations();
      });
    this.locationService.fetchLocations();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
