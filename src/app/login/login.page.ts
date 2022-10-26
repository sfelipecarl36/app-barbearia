import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import { NativePageTransitions, NativeTransitionOptions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { getAuth, setPersistence ,signInWithEmailAndPassword, browserSessionPersistence   } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: any;
  constructor(
    private nativePageTransitions: NativePageTransitions,
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public router: Router,
    public firestore: AngularFirestore,
    public navCtrl: NavController,
    private alertController: AlertController
  ) {

  }
  ngOnInit() {}

  logarEmail(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['home']);          
        } else {
          this.router.navigate(['home']);          
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

  async presentAlert(texto) {
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

  openPage(page) {

    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 600,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 200,
       androiddelay: 250,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      }
   
    this.nativePageTransitions.slide(options)
    this.router.navigateByUrl(page)
    
   }
  

   logIn(email, senha) {
    this.showLoading()
    this.authService.SignIn(email.value, senha.value)
      .then((res) => {
        // if(this.authService.isEmailVerified) {
          this.router.navigate(['home']);          
        // } else {
        //   this.presentAlert('Email não verificado!')
        //   return false;
        // }
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  
  // logarEmail(){
  // const auth = getAuth();
  // this.authService.SignIn(this.email, this.senha).then(() => {
  //   this.router.navigate(['home']);
  // }).catch((error: any) => console.error(error));

  // }

  // loginEmail() {
  //   this.firebaseAuthentication.signInWithEmailAndPassword(this.email, this.senha)
  //   .then((res: any) => console.log(res))
  //   .catch((error: any) => console.error(error));
  //   }
}