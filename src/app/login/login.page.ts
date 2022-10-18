import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { getAuth, setPersistence ,signInWithEmailAndPassword, browserSessionPersistence   } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: any;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public firestore: AngularFirestore
  ) {}
  ngOnInit() {}

  logarEmail(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['home']);          
        } else {
          this.router.navigate(['home']);          
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then( user => {
      this.authService.SetUserData(user.user)
      setPersistence(getAuth(), browserSessionPersistence)

      this.router.navigate(['home']);          
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  
  // logarEmail(){
  // const auth = getAuth();
  // this.authService.SignIn(this.email, this.senha).then(() => {
  //   this.router.navigate(['home']);
  // }).catch((error: any) => console.error(error));

  // }

  // loginEmail() {
  //   this.firebaseAuthentication.signInWithEmailAndPassword(this.email, this.senha)
  //   .then((res: any) => console.log(res))
  //   .catch((error: any) => console.error(error));
  //   }
}