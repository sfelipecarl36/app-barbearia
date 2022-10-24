import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { iterator } from 'rxjs/internal-compatibility';

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
  notifica: any;
  notificacoesGet: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public firestore: AngularFirestore,
    private toastController: ToastController,
  ) {

    this.profissionais =  this.firestore.collection('profissionais').valueChanges();
    this.servicos =  this.firestore.collection('servicos').valueChanges();
    
    this.authService.ngFireAuth.currentUser.then( user => {

    this.notificacoes = firestore.collection('notificacoes', ref => ref.limit(25).
    where('user', '==', user.uid).
    orderBy('idOrder', 'desc')).valueChanges();

    this.notificacoesGet = firestore.collection('notificacoes', ref => ref.
    where('user', '==', user.uid));

    this.notifica = firestore.collection('notificacoes', ref => ref.
    where('user', '==', user.uid));
    })

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Notificação Lida!',
      duration: 500,
      position: position
    });

    await toast.present();
  }

  updateLido(id){
    this.notificacoesGet.doc(id).update({lido: true})
      this.presentToast('bottom')
  }

  ngOnInit() {
    
  }
}
