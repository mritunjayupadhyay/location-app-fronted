import { LocationDB } from './../location.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-map-details',
  templateUrl: './location-map-details.component.html',
  styleUrls: ['./location-map-details.component.scss']
})
export class LocationMapDetailsComponent implements OnInit {
  @Input() location: LocationDB;
  constructor() { }

  ngOnInit(): void {
    
  }

}
