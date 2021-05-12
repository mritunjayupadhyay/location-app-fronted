import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { Location, LocationDB } from './location.model';

import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';

const { baseUrl } = environment;
@Injectable({ providedIn: 'root' })
export class LocationService {
  locationsChanged = new Subject<LocationDB[]>();
  locationSelected = new Subject<LocationDB>();
  openLocationForm = new Subject<boolean>();
  saveLocation = new Subject<any>();
  private locations: LocationDB[];
  private selectedLocation: LocationDB = null;

  constructor(private http: HttpClient, private authSerive: AuthService) {}

  getLocations(): LocationDB[] {
    return this.locations;
  }

  selectLocation(location: LocationDB) {
    this.selectedLocation = { ...location };
    this.locationSelected.next({...location});
  }

  onOpenAddLocationForm() {
    this.openLocationForm.next(true);
  }

  onCloseAddLocationForm() {
    this.openLocationForm.next(false);
  }

  saveLocationToDatabase(location: Location) {
    const authToken = this.authSerive.getAuthToken();
    this.http
      .post<{ error: boolean, data?: LocationDB }>(
        `${baseUrl}/locations`,
        location,
        {
          headers: {
            "authorization": authToken,
            "Content-Type": "application/json"
          }
        }
      )
      .subscribe(response => {
        const { error, data } = response;
        if (error === false) {
          this.fetchLocations();
          this.openLocationForm.next(false);
        }
      },
      ({error = {}}) => {
        const { stack = {} } = error;
        const { message = [] } = stack;
        const err = message[0] || '';
        const errMsg = `Error: ${err}`;
        this.saveLocation.error(errMsg);
      }
      );
  }

  fetchLocations() {
    const authToken = this.authSerive.getAuthToken();
    const username = this.authSerive.getUserName();
    this.http
      .get<{ error: false, data: LocationDB[] }>(
        `${baseUrl}/locations`,
        {
          headers: {
            "authorization": authToken,
            "Content-Type": "application/json"
          }
        }
      ).subscribe(response => {
        const { error, data = [] } = response;
        if (error === false) {
          this.locations = data;
          this.locationsChanged.next([...data]);
        }
      });
  }

  deleteLocation(id) {
    const authToken = this.authSerive.getAuthToken();
    this.http
      .delete<{ error: false, data: any }>(
        `${baseUrl}/locations/${id}`,
        {
          headers: {
            "authorization": authToken,
            "Content-Type": "application/json"
          }
        }
      )
      .subscribe(response => {
        const { error } = response;
        if (error === false) {
          this.fetchLocations();
          if (id === this.selectedLocation._id) {
            this.selectedLocation = null;
            this.locationSelected.next(null);
          }
          this.openLocationForm.next(false);
        } else {

        }
      });
  }
}