import { Location } from './../../location.model';
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../location.service';
@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {
  @Input() location: Location;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  selectLocationItem() {
    console.log("click")
    this.locationService.selectLocation(this.location);
  }

}
