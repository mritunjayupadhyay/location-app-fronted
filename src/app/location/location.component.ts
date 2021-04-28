import { Location } from './location.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  selectedLocation: Location | null = null;
  subscriptionSelectedLocation: Subscription;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.subscriptionSelectedLocation = this.locationService.locationSelected
    .subscribe(
      (location: Location) => {
        console.log("locatin", location);
        this.selectedLocation = location;
      }
    );
  }

}
