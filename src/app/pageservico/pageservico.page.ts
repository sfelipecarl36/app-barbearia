import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pageservico',
  templateUrl: './pageservico.page.html',
  styleUrls: ['./pageservico.page.scss'],
})
export class PageservicoPage implements OnInit {
  servico: any;
  tiposervicos: any;

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    private alertController: AlertController,
    public auth: AngularFireAuth,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { 

    this.activatedRoute.queryParams.subscribe(params => {
      this.servico = firestore.collection('servicos', ref => ref.
      where('id', '==', params[0])).valueChanges();

      this.tiposervicos = firestore.collection('tiposervicos').valueChanges();      
    })
  }

  ngOnInit() {
  }

}
