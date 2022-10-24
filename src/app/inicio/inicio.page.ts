import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NativePageTransitions, NativeTransitionOptions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public authService: AuthenticationService,
    private nativePageTransitions: NativePageTransitions,
    public router: Router,
    ) {}
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
  }

  openPage(page) {

    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 600,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 200,
       androiddelay: 250,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      }
   
    this.nativePageTransitions.slide(options)
    this.router.navigateByUrl(page)
    
   }

  

}
