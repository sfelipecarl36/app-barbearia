import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-novomural',
  templateUrl: './novomural.page.html',
  styleUrls: ['./novomural.page.scss'],
})
export class NovomuralPage implements OnInit {
  murais: any;
  murais_collection: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public firestore: AngularFirestore,
    private toastController: ToastController,
  ) { 

    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Mural Adicionado!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  ngOnInit() {
  }

  registerMural(texto){
    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
    this.murais_collection.add({texto: texto.value, user: this.authService.userUid});
    this.router.navigateByUrl('mural');
    this.presentToast('middle')
    }
  }

}
