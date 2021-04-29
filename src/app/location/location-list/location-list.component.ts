import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from './../location.service';
import { LocationDB } from './../location.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: LocationDB[];
  subscription: Subscription;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.subscription = this.locationService.locationsChanged
      .subscribe(
        (locations: LocationDB[]) => {
          this.locations = locations;
        }
      );
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
