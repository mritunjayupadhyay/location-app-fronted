import { Component, OnInit } from '@angular/core';
import { LocationService } from './../location.service';
import { Location } from './../location.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locations: Location[];
  subscription: Subscription;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.subscription = this.locationService.locationsChanged
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        }
      );
    this.locationService.fetchLocations();
  }

}
