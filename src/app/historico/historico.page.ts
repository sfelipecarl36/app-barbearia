import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from "../shared/authentication-service";
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {
  
  profissionais: any;
  agendamentos: any;
  agend: any;
  nomeprof: any
  servicos: any;
  barbeiro: any;
  useruid: any;
  status: any;
  

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  ) { 

    

    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
      this.useruid = authService.userUid
      this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15)
      // .orderBy('id', 'desc')
      .where('user', '==', authService.userUid));

      this.agendamentos = this.agend.valueChanges()
      this.profissionais = this.firestore.collection('profissionais').valueChanges();
      this.status = this.firestore.collection('status', ref => ref.orderBy('id', 'asc')).valueChanges();
      this.servicos =  this.firestore.collection('servicos', ref => ref.limit(100).orderBy('id', 'desc')).valueChanges();
    }

    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      duration: 1800,
      spinner: 'circles',
    });

    loading.present();
  }

  detalhar(servico, profissional, data, hora, pagamento, docId, status) {
    this.router.navigate(['detailservico'],{
    queryParams: [servico, profissional, data, hora, pagamento, docId, status]
    })
  }

  ionViewDidLoad(){
    this.showLoading()
  }

  segmentChanged(e){
    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
    this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15).
    orderBy('id', 'desc').where('status', '==',String(e.detail.value)).where('user', '==',this.authService.userUid));

    this.agendamentos = this.agend.valueChanges()
    }
    
  }

}
