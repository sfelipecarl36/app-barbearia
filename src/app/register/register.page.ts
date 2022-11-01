import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import { getAuth, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ngFireAuth: any;
  nome: string
  email: string
  celular: string
  senha: string
  error: any
  public user: any = {}
  dadosUsers: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private loadingCtrl: LoadingController,
    public afs: AngularFirestore,
    private alertController: AlertController,
  ) { }
  ngOnInit(){}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...',
      duration: 3500,
      spinner: 'circles',
    });

    loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Bem-vindo a Barbearia Los Ursos!',
      buttons: [
        {
          text: 'Obrigado!',
        },
      ],
    });

    await alert.present();
  }


  ionViewWillEnter(){
    if(this.authService.userUid?.length<1){
      console.log('Não logado')
    }
    else{
      this.router.navigateByUrl('home')
    }
   }
    
    signUp(nome, celular, email, senha){
      this.showLoading()
      console.log('nome: '+nome.value+' celular: '+celular.value+' email: '+email.value+' senha: '+senha.value)
      this.authService.RegisterUser(nome.value, celular.value, email.value, senha.value)
      .then((res) => {
        this.router.navigateByUrl('home');
        this.presentAlert()
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}