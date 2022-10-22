import { Component } from '@angular/core';
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AngularFireAuth) {

  }

  
  
  

}
