import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { decode } from 'base64-arraybuffer'


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
  userImg: any = '';
  base64Img = '';

  public uploudPercent: Number
  public downloadUrl: any
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private afStorage: AngularFireStorage,
    public firestore: AngularFirestore,
    private toastController: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private file: File
  ) {

    

    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
      this.users = this.firestore.collection('users', ref => ref
      .where('uid', '==', this.authService.userUid)).valueChanges();
    }
    
  }

  async openGallery() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }


try{
    const fileUri: string = await this.camera.getPicture(options)
    let file: string;

    file = fileUri.substring(fileUri.lastIndexOf('/')+1, fileUri.indexOf('?'));
    

    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
    const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
    const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});

    this.uploudPicture(blob);
} 

catch(error){
  window.alert('error: '+error.message)
}

}

  uploudPicture(blob: Blob){

  const ref = this.afStorage.ref(this.authService.userUid+'.jpg')
  const task = ref.put(blob)

  task.percentageChanges().subscribe((percent) => {
    this.uploudPercent = percent;
  });

  ref.getDownloadURL().subscribe((url) => {
    this.downloadUrl = url;
    this.firestore.collection('users').doc(this.authService.userUid).update({photoURL: this.downloadUrl})
  });
  
  
  this.uploudPercent = 0
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
    this.firestore.collection('users').doc(this.authService.userUid).update({displayName: nome.value, celular: celular.value}).then( res => {
      this.router.navigateByUrl('perfil')
      this.presentToast('middle')
    })
  }
}
