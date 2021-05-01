import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  openForm: boolean = false;
  subscriptionSelectedLocation: Subscription;
  saveLocation: Subscription;

  address: string = "";
  latitude: number;
  longitude: number;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.subscriptionSelectedLocation = this.locationService.openLocationForm
    .subscribe(
      (open: boolean) => {
        this.openForm = open;
        this.address = '';
        this.latitude = undefined;
        this.longitude = undefined;
      }
    );
    this.saveLocation = this.locationService.saveLocation
    .subscribe(
      () => {},
      (error) => {
        alert(error);
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionSelectedLocation.unsubscribe();
  }

  onChangeText(event) {
    if (!event) { return; }
    const { name, value  } = event.target;
    this[name] = value;
  }

  submit_address() {
    const { address, latitude, longitude } = this;
    const location = {
      address,
      latitude: typeof latitude === 'string' ? parseFloat(latitude) : latitude,
      longitude: typeof longitude === 'string' ? parseFloat(longitude) : longitude,
    }
    console.log("location", location);
    if (!(latitude && longitude && address)) {
      alert('Address, latitude and longitude are required');
      return;
    }
    if (address.length < 7) {
      alert('You address should be at least 7 character long');
      return;
    }
    this.locationService.saveLocationToDatabase(location);
  }

  cancel() {
    this.locationService.onCloseAddLocationForm();
  }

}
