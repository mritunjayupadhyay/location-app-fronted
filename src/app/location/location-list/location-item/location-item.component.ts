import { LocationDB } from './../../location.model';
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../location.service';
@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {
  @Input() location: LocationDB;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  selectLocationItem() {
    console.log("location select is clicked", this.location);
    this.locationService.selectLocation(this.location);
  }
  delete(event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete')) {
      this.locationService.deleteLocation(this.location._id);
    }
  }
}
