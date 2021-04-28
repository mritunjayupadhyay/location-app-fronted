import { Location } from './../location.model';
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-map-details',
  templateUrl: './location-map-details.component.html',
  styleUrls: ['./location-map-details.component.scss']
})
export class LocationMapDetailsComponent implements OnInit {
  location: Location = {
    latitude: 12,
    longitude: 20,
    address: 'some addres',
    userId: 'sdlfksd'
  };
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.locationSelected.subscribe((location: Location) => {
      console.log(location, "location");
      
      this.location = location;
    })
  }

}
