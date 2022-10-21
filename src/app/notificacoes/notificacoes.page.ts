import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {
  users: any;
  notificacoes: any;
  servicos: any;
  profissionais: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public firestore: AngularFirestore,
  ) {

    this.profissionais =  this.firestore.collection('profissionais').valueChanges();
    this.servicos =  this.firestore.collection('servicos').valueChanges();
    
    this.authService.ngFireAuth.currentUser.then( user => {
    this.notificacoes = firestore.collection('notificacoes', ref => ref.limit(25).
    where('user', '==', user.uid)).valueChanges()
    })

  }

  ngOnInit() {
  }
}
