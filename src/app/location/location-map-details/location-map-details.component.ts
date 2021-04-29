import { LocationDB } from './../location.model';
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-map-details',
  templateUrl: './location-map-details.component.html',
  styleUrls: ['./location-map-details.component.scss']
})
export class LocationMapDetailsComponent implements OnInit {
  location: LocationDB = {
    latitude: 12,
    longitude: 20,
    address: 'some addres',
    userId: 'sdlfksd',
    _id: 'klsdfs'
  };
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.locationSelected.subscribe((location: LocationDB) => {
      this.location = location;
    })
  }

}
