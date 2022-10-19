import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from "../shared/authentication-service";


@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {
  
  profissionais: any;
  agendamentos: any;
  agend: any;

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  ) { 

    this.authService.ngFireAuth.currentUser.then( user => {

      this.agend = firestore.collection('agendamentos', ref => ref.
      where('user', '==', user.uid));

      this.agendamentos = this.agend.valueChanges();
      
      // this.agendamentos.then( agenda => {
      //   this.profissionais = firestore.collection('profissionais', ref => ref.
      //   where('id', '==', agenda.profissional)).valueChanges();
      // })

    }).catch( error => {
      // this.router.navigateByUrl('inicio');
      console.log('Deu erro!')
    })

  }

}
