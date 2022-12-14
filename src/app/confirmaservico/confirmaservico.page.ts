import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-confirmaservico',
  templateUrl: './confirmaservico.page.html',
  styleUrls: ['./confirmaservico.page.scss'],
})
export class ConfirmaservicoPage implements OnInit {

  users: any

  servico: any
  profissional: any
  dataehora: any
  hora: any

  idGet: any

  pagamentos: any
  agendamentos: any;
  prof: any;
  serv: any;
  handlerMessage: string;
  roleMessage: string;
  pag_var: any;
  notificacoes: any;
  profissionais: any;
  agendas: import("@angular/fire/compat/firestore").AngularFirestoreCollection<unknown>;
  nomeprof: any;
  pagamentoModel: any;
  idGetNot: any;
  agendaCheck: number;
  horaCheck: number;
  horaSel: any;
  diaSel: any;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) { 

    this.pagamentos = firestore.collection('pagamentos').valueChanges();
    this.agendamentos = firestore.collection('agendamentos');
    this.notificacoes = firestore.collection('notificacoes');
    this.diaSel = new Date().getDate();
    this.horaSel = String(new Date().getHours());
    this.horaSel = ('0'+this.horaSel).slice(-2)

    this.agendamentos.valueChanges().subscribe( x=> {
      this.idGet = (x.length)+1;
    })

    this.notificacoes.valueChanges().subscribe( x=> {
      this.idGetNot = (x.length)+1;
    })

    this.activatedRoute.queryParams.subscribe(params => {

      console.log('Barbeiro: '+params[0]+' Servi??o: '+params[1], params[2], params[3])
      this.profissional = firestore.collection('profissionais', ref => ref.
      where('id', '==', params[0])).valueChanges();

      this.profissionais = firestore.collection('profissionais', ref => ref.
      where('id', '==', params[0]));

      this.servico = firestore.collection('servicos', ref => ref.
      where('id', '==', params[1])).valueChanges();

      this.prof = params[0]
      this.serv = params[1]
      this.dataehora = params[2]
      this.hora = params[3].substring(0,5)
      console.log(this.hora.substring(0,2))
      });

      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', authService.userUid)).valueChanges();
    
    console.log(this.horaSel)
    
   }

   async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Agendamento conclu??do!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  async presentAlert2(texto) {
    const alert = await this.alertController.create({
      header: texto,
      buttons: [
        {
          text: 'Ok',
        },
      ],
    });

    await alert.present();
  }

   async presentAlert(pagamento, nomeservico, nomeprof) {
    const alert = await this.alertController.create({
      header: 'Proceder com Agendamento?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          handler: data => {
              this.confirmarServico(pagamento, nomeservico, nomeprof)
            }
        },
      ],
    });

    await alert.present();
  }


  ngOnInit(){

  }

  canSave(): boolean{
    return this.pagamentoModel != null
  }

  agendar(pagamento, nomeservico, nomeprof){
    
      this.agendamentos.add({ status: "1", data: this.dataehora, hora: this.hora, pagamento: pagamento.value, profissional: this.prof, id: this.idGet, servico: this.serv, user: this.authService.userUid, docId: this.idGet}).then( newAgend => {
      this.agendamentos.doc(newAgend.id).update({docId: newAgend.id})
      });
      this.notificacoes.add({ texto: "Voc?? agendou "+nomeservico+" com "+nomeprof+" para "+this.dataehora, user: this.authService.userUid, lido: false, id: this.idGetNot, idOrder: this.idGetNot}).then( newNotif => {  
      this.notificacoes.doc(newNotif.id).update({id: newNotif.id})
      });
      this.router.navigateByUrl('historico');
      this.presentToast('middle')
      
  }

  confirmarServico(pagamento, nomeservico, nomeprof){

    this.agendaCheck = 0
    let i = 0
    this.horaCheck = 0
    this.horaSel = String(new Date().getHours());
    this.horaSel = ('0'+this.horaSel).slice(-2)

    
      this.firestore.collection('agendamentos', ref => ref.
        where('status', '==', '1').
        where('data', '==', this.dataehora).
        where('hora', '==', this.hora).
        where('profissional', '==', this.prof)).stateChanges().subscribe( c=> {
          i+=1
          this.agendaCheck = (c.length);
          if(this.diaSel==this.dataehora.substring(0,2)){      

            if((this.horaSel)<(this.hora.substring(0,2)) && this.agendaCheck==0 && i==1){
              this.agendar(pagamento, nomeservico, nomeprof)
            }
            else if((this.horaSel)>=(this.hora.substring(0,2)) && this.agendaCheck==0 && i==1){
              this.presentAlert2('Hor??rio N??o Permitido!');
              this.router.navigateByUrl('novoservico');
            }
            else if((this.horaSel)<(this.hora.substring(0,2)) && this.agendaCheck>0 && i==1){
              this.presentAlert2('Agenda Ocupada!');
              this.router.navigateByUrl('novoservico');
            }
          }
          else{
            if(this.agendaCheck==0 && i==1){
                this.agendar(pagamento, nomeservico, nomeprof) 
            }
            else if(this.agendaCheck>0 && i==1){
              this.presentAlert2('Agenda Ocupada!');
              this.router.navigateByUrl('novoservico');
            } 
          }

          

        })
    }
    
}
