import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    if (typeof window !== 'undefined') {
      return keycloak.init({
        config: {
          url: 'http://localhost:8090',
          realm: 'cherifa-realm',
          clientId: 'prop-app',
        },
        initOptions: {
          /*           onLoad: 'login-required',
                    checkLoginIframe: true, */
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        },
      });
    } else {
      console.warn('Keycloak initialization skipped: running in a server environment.');
      return Promise.resolve();
    }
  };
}



@NgModule({
  declarations: [
    AppComponent,
    HousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
