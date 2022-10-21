import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {
  users: any;
  murais: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public firestore: AngularFirestore,
  ) {
    
    this.murais = firestore.collection('murais').valueChanges()

    authService.ngFireAuth.currentUser.then( user => {
      this.users = firestore.collection('users').valueChanges();
    }).catch( error => {
      this.router.navigateByUrl('inicio');
    })

  }

  ngOnInit() {
  }

}
