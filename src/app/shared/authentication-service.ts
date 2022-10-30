import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  public userUid: string = '';
  constructor(
    public afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
  ) {



    this.ngFireAuth.authState.subscribe((user) => {
      if (user) { 
        this.userUid = user.uid
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  // Login in with email/password
  async SignIn(email, senha) {
    const user = await this.ngFireAuth.signInWithEmailAndPassword(email, senha);
    console.log(user.user.uid);
    this.userUid = user.user.uid
    return user;
  }
  // Register user with email/password
  RegisterUser(nome, celular, email, senha) {
    
    return this.ngFireAuth.createUserWithEmailAndPassword(email, senha).then( newUser => {
      this.afs.collection('users').doc(newUser.user.uid).set({ email: email,emailVerified: false,displayName: nome, celular: celular, photoURL: '../assets/perfil.png', uid: newUser.user.uid});
      const ref = this.afStorage.ref('perfil.png')
      ref.getDownloadURL().subscribe((url) => {
        this.afs.collection('users').doc(newUser.user.uid).update({photoURL: url})
      });
      this.userUid = newUser.user.uid
      
    })
    
  }
  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
        this.userUid = result.user.uid
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      celular: user.phoneNumber,
      emailVerified: user.emailVerified,
      
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['inicio']);
    });
  }
}