import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) { 

    this.pagamentos = firestore.collection('pagamentos').valueChanges();
    this.agendamentos = firestore.collection('agendamentos');

    this.agendamentos.valueChanges().subscribe( x=> {
      this.idGet = (x.length)+1;
    })

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('Barbeiro: '+params[0]+' Serviço: '+params[1], params[2], params[3])
      this.profissional = firestore.collection('profissionais', ref => ref.
      where('id', '==', params[0])).valueChanges();

      this.servico = firestore.collection('servicos', ref => ref.
      where('id', '==', params[1])).valueChanges();

      this.prof = params[0]
      this.serv = params[1]
      this.dataehora = params[2]
      this.hora = params[3]
      });


    authService.ngFireAuth.currentUser.then( user => {
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', user.uid)).valueChanges();
    }).catch( error => {
      this.router.navigateByUrl('inicio');
    })
   }

  ngOnInit() {
  }

  confirmarServico(pagamento){
    
    this.authService.ngFireAuth.currentUser.then( user => {
    this.agendamentos.add({ data: this.dataehora, hora: this.hora, pagamento: pagamento.value, profissional: this.prof, id: this.idGet, servico: this.serv, user: user.uid});
    this.router.navigateByUrl('historico');
    })
    }
    

}
