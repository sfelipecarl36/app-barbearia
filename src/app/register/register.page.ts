import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import { getAuth, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireAuthModule } from 'angularfire2/auth';

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
    public afs: AngularFirestore
  ) { }
  ngOnInit(){}

  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...',
      duration: 3500,
      spinner: 'circles',
    });

    loading.present();
  }

    registrarEmail(){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.senha).then( newUser => {
      this.afs.collection('users').doc(newUser.user.uid).set({ nome: this.nome, celular: this.celular, foto: 'url',ativo: true, uid: newUser.user.uid});
      // this.dadosUsers = this.afs.collection('dadosUsers').doc(newUser.user.uid).valueChanges();
      this.showLoading()
      this.router.navigateByUrl('home');
    })
    }
    
    signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}