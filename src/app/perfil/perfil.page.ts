import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication-service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  users: any

  constructor(
    private alertController: AlertController,
    private router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  )
  {

    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', authService.userUid)).valueChanges();
    }
    
   }

   async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Encessar Sessão?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sair',
          handler: data => {
              this.logout()
            }
        },
      ],
    });

    await alert.present();
  }

  editar() {
    this.router.navigate(['editarperfil'])
  }

  logout(){
    this.authService.SignOut()
  }

  }
