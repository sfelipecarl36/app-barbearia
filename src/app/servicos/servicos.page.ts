import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from "../shared/authentication-service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  servic: import("@angular/fire/compat/firestore").AngularFirestoreCollection<unknown>;
  servicos: any;
  tiposervicos: any;

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    public auth: AngularFireAuth,
    private alertController: AlertController,
  ) { 

    interface SegmentChangeEventDetail {
      value?: string;
    }
      this.servic = this.firestore.collection('servicos');
      this.tiposervicos = this.firestore.collection('tiposervicos').valueChanges();
      this.servicos = this.servic.valueChanges()

  }

  ngOnInit() {
  }

  segmentChanged(e){
    this.servicos = this.firestore.collection('servicos', ref => ref.where("tipo", "==", e.detail.value)).valueChanges()
  }

  detalhar(servicoId) {
    this.router.navigate(['pageservico'],{
    queryParams: [servicoId]
    })
  }

}
