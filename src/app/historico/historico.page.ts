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

    

    this.authService.ngFireAuth.currentUser.then( user => {

      this.useruid = user.uid
      this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15)
      // .orderBy('id', 'desc')
      .where('user', '==', user.uid));

      this.agendamentos = this.agend.valueChanges()
      this.profissionais = this.firestore.collection('profissionais').valueChanges();
      this.status = this.firestore.collection('status', ref => ref.orderBy('id', 'asc')).valueChanges();
      this.servicos =  this.firestore.collection('servicos', ref => ref.limit(100).orderBy('id', 'desc')).valueChanges();

    //   interface agenda {
    //     profissional: any
    //     servico: any
    //     data: any
    //     hora: any
    //     status: any
    // }
    
            
    //            this.agendamentos
    //             .subscribe((res: agenda[]) => {
    //                 console.log(res);
    //                 res.forEach((item) => {

    //                 interface prof {
    //                     nome: any
    //                     img: any
    //                 }

    //                 this.profissionais = this.firestore.collection('profissionais', ref => ref.
    //                   where('id', '==', item.profissional)).valueChanges().subscribe( x => {
    //                     this.nomeprof = x.nome
    //                   })
                      
    //                   console.log('Barbeiro: '+item.profissional);
    //                   console.log('Serviço: '+item.servico);
                      
    //                   this.servicos = this.firestore.collection('servicos', ref => ref.
    //                   where('id', '==', item.servico))
    //                 });
    //             });
    
          
          // console.log(this.profissionais)

    }).catch( error => {
      this.router.navigateByUrl('inicio');
      // console.log('Deu erro!')
    })

    
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
    this.authService.ngFireAuth.currentUser.then( user => {
    this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15).
    orderBy('id', 'desc').where('status', '==',String(e.detail.value)).where('user', '==',user.uid));

    this.agendamentos = this.agend.valueChanges()
    
    })
  }

}
