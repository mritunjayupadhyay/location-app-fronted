import { Location } from './../location.model';
import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
