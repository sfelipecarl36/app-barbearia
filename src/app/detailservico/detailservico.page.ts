import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Console } from 'console';


@Component({
  selector: 'app-detailservico',
  templateUrl: './detailservico.page.html',
  styleUrls: ['./detailservico.page.scss'],
})
export class DetailservicoPage implements OnInit {
  profissional: any;
  servico: any;
  prof: any;
  serv: any;
  dataehora: any;
  hora: any;
  pag: any;
  pagamento: any;
  agend: any;
  agendamento: any;
  docID: any;
  status: any;
  statusPa: any;

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
      console.log(params[0], params[1], params[2], params[3], params[4], params[5], params[6])
      this.profissional = firestore.collection('profissionais', ref => ref.
      where('id', '==', params[1])).valueChanges();

      this.servico = firestore.collection('servicos', ref => ref.
      where('id', '==', params[0])).valueChanges();

      this.pagamento = firestore.collection('pagamentos', ref => ref.
      where('id', '==', params[4])).valueChanges();
      
      this.status = firestore.collection('status', ref => ref.
      where('id', '==', String(params[6]))).valueChanges();

      this.prof = params[0]
      this.serv = params[1]
      this.dataehora = params[2]
      this.hora = params[3]
      this.pag = params[4]
      this.docID = params[5]
      this.statusPa = params[6]
      
      });

      this.agendamento = this.firestore.collection("agendamentos")
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Agendamento Cancelado!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cancelar Agendamento do Registro?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim, Cancelar',
          handler: data => {
              this.cancelarAgend()
            }
        },
      ],
    });

    await alert.present();
  }

  cancelarAgend(){
    this.agendamento.doc(this.docID).update({status: "3"})
    this.router.navigateByUrl('historico')  
    this.presentToast('middle')
  }

  ngOnInit() {
  }

}
