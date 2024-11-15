import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddHouseComponent } from './add-house/add-house.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HousesComponent } from './houses/houses.component';
import { ListeOwnersComponent } from './liste-owners/liste-owners.component';
import { LoginComponent } from './login/login.component';
import { SearchByAddressComponent } from './search-by-address/search-by-address.component';
import { SearchByOwnerComponent } from './search-by-owner/search-by-owner.component';
import { TokenInterceptor } from './services/token.interceptor';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { UpdateOwnersComponent } from './update-owners/update-owners.component';
import { RegisterComponent } from './register/register.component';


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
    ForbiddenComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    { provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
