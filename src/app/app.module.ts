import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from './shared/auth.service';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, enableIndexedDbPersistence } from '@angular/fire/firestore';

import { AngularFireAuthModule, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, UserProfileComponent, SignInComponent],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    AppRoutingModule
  ],
  providers: [AuthService,NativePageTransitions, Camera, File],
  bootstrap: [AppComponent],
})
export class AppModule {}
