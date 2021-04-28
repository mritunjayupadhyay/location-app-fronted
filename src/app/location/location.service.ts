import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { Location } from './location.model';

import { baseUrl } from '../config';
import { AuthService } from '../auth/auth.service';
@Injectable({ providedIn: 'root' })
export class LocationService {
  locationsChanged = new Subject<Location[]>();
  locationSelected = new Subject<Location>();
  private locations: Location[];

  constructor(private http: HttpClient, private authSerive: AuthService) {}

  getLocations(): Location[] {
    return this.locations;
  }

  selectLocation(location: Location) {
    this.locationSelected.next({...location});
  }

  addLocation(location: Location) {
    const authToken = this.authSerive.getAuthToken();
    this.http
      .post(
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
        console.log(response);
      });
  }

  fetchLocations() {
    const authToken = this.authSerive.getAuthToken();
    this.http
      .get<{ error: false, data: Location[] }>(
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
}