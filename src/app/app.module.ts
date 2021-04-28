import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationComponent } from './location/location.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationMapDetailsComponent } from './location/location-map-details/location-map-details.component';
import { LocationItemComponent } from './location/location-list/location-item/location-item.component';
import { googleApiKey } from './config';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationComponent,
    LocationListComponent,
    LocationMapDetailsComponent,
    LocationItemComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: googleApiKey
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
