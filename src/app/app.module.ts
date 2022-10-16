import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  { provide: USE_DEVICE_LANGUAGE, useValue: true },
  { provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
