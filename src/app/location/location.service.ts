import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Location } from './location.model';

import { baseUrl } from '../config';

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDg0MzU1NDJjNWMxZjIzZjgzMjRjYjUiLCJpYXQiOjE2MTk1Nzk5NzUsImV4cCI6MTYxOTYxNTk3NX0.mJT3f80xPElhjffS1OOTHyVg2gylZ0KGfssvmP-4o9Q";
@Injectable({ providedIn: 'root' })
export class LocationService {
  private locations: Location[];

  constructor(private http: HttpClient) {}

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

  getLocations() {
    this.http
      .get(
        `${baseUrl}/locations`,
        {
          headers: {
            "authorization": authToken,
            "Content-Type": "application/json"
          }
        }
      ).subscribe(response => {
        console.log("fetch", response);
      });
  }
}