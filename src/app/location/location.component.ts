import { LocationDB } from './location.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  selectedLocation: LocationDB | null = null;
  subscriptionSelectedLocation: Subscription;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.subscriptionSelectedLocation = this.locationService.locationSelected
    .subscribe(
      (location: LocationDB) => {
        console.log("location selected", location);
        this.selectedLocation = location;
      },
      (error) => {
        console.log("Error in selecting")
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionSelectedLocation.unsubscribe();
  }

}
