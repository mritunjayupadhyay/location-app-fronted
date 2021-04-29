import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { Location, LocationDB } from './location.model';

import { baseUrl } from '../config';
import { AuthService } from '../auth/auth.service';
@Injectable({ providedIn: 'root' })
export class LocationService {
  locationsChanged = new Subject<LocationDB[]>();
  locationSelected = new Subject<LocationDB>();
  openLocationForm = new Subject<boolean>();
  private locations: LocationDB[];

  constructor(private http: HttpClient, private authSerive: AuthService) {}

  getLocations(): LocationDB[] {
    return this.locations;
  }

  selectLocation(location: LocationDB) {
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
      .post<{ error: false, data: LocationDB }>(
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
      });
  }

  fetchLocations() {
    const authToken = this.authSerive.getAuthToken();
    const username = this.authSerive.getUserName();
    console.log("auth token in location service", authToken, username, this.authSerive);
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
      .delete<{ error: false, data: LocationDB }>(
        `${baseUrl}/locations/${id}`,
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
      });
  }
}