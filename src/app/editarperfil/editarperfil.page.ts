import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage {
  docID: any;
  users: any;
  nome: any;
  celular: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public firestore: AngularFirestore,
    private toastController: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.docID = params[0]
    })

    this.authService.ngFireAuth.currentUser.then( user => {

      this.users = this.firestore.collection('users', ref => ref
      .where('uid', '==', this.docID)).valueChanges();
   })

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Perfil Atualizado!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  canSave(nome, celular): boolean{ 
    return nome.value.length>1 &&
    celular.value.length>8
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Atualizando...',
      duration: 1200,
      spinner: 'circles',
    });

    loading.present();
  }

  updateUser(nome, celular){
    this.showLoading()
    this.firestore.collection('users').doc(this.docID).update({displayName: nome.value, celular: celular.value}).then( res => {
      this.router.navigateByUrl('perfil')
      this.presentToast('middle')
    })
  }
}
