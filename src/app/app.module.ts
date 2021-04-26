import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationComponent } from './location/location.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationMapDetailsComponent } from './location/location-map-details/location-map-details.component';
import { LocationItemComponent } from './location/location-list/location-item/location-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationComponent,
    LocationListComponent,
    LocationMapDetailsComponent,
    LocationItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
