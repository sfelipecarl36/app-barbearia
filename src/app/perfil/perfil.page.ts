import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication-service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  users: any

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  )
  {

    authService.ngFireAuth.currentUser.then( user => {
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', user.uid)).valueChanges();
    }).catch( error => {
      this.router.navigateByUrl('inicio');
    })
    
   }

  logout(){
    this.authService.SignOut()
  }

  }
