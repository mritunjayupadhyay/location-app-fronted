import { Component, OnInit } from '@angular/core';
import { LocationService } from './../location.service';
import { Location } from './../location.model';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [
    new Location('user1', 12, 21, 'first place'),
    new Location('user1', 15, 41, 'second place')
  ];
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocations();
  }

}
