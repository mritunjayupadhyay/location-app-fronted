import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { Location } from './location.model';

import { baseUrl } from '../config';

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDg0MzU1NDJjNWMxZjIzZjgzMjRjYjUiLCJpYXQiOjE2MTk1Nzk5NzUsImV4cCI6MTYxOTYxNTk3NX0.mJT3f80xPElhjffS1OOTHyVg2gylZ0KGfssvmP-4o9Q";
@Injectable({ providedIn: 'root' })
export class LocationService {
  locationsChanged = new Subject<Location[]>();
  private locations: Location[];

  constructor(private http: HttpClient) {}

  getLocation(): Location[] {
    return this.locations;
  }

  addLocation(location: Location) {
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