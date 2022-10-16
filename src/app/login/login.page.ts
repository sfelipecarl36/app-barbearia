import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string
  senha: string
  error: any;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public firestore: AngularFirestore
  ) {}
  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['dashboard']);          
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  
  logarEmail(){
  const auth = getAuth();
  signInWithEmailAndPassword(auth, this.email, this.senha).then(() => {
    this.router.navigate(['home']);
  })

  }

  // loginEmail() {
  //   this.firebaseAuthentication.signInWithEmailAndPassword(this.email, this.senha)
  //   .then((res: any) => console.log(res))
  //   .catch((error: any) => console.error(error));
  //   }
}