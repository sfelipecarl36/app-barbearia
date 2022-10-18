import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication-service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  users: any

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  ) { 
    authService.ngFireAuth.currentUser.then( user => {
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', user.uid)).valueChanges();
    }).catch( error => {
      this.router.navigateByUrl('inicio');
    })
   }

  ngOnInit() {
  }

  logout(){
    this.authService.SignOut()
  }

  }
