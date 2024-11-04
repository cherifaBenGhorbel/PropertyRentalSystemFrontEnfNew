import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { FormsModule } from '@angular/forms';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchByOwnerComponent } from './search-by-owner/search-by-owner.component';
import { SearchByAddressComponent } from './search-by-address/search-by-address.component';
import { ListeOwnersComponent } from './liste-owners/liste-owners.component';
import { UpdateOwnersComponent } from './update-owners/update-owners.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    AddHouseComponent,
    UpdateHouseComponent,
    SearchByOwnerComponent,
    SearchByAddressComponent,
    ListeOwnersComponent,
    UpdateOwnersComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
