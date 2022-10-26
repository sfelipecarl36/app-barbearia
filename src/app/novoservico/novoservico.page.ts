import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novoservico',
  templateUrl: './novoservico.page.html',
  styleUrls: ['./novoservico.page.scss'],
})
export class NovoservicoPage implements OnInit {

  slideOpts = {
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 0,
      slideShadows: false,
    },
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
   
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  logs: any;
  hourValues: String;
  minuteValues: any;
  agendamentos: any;
  horasDisp: any;
  servicoSel: any;
  dataSel: any;
  startDate: any;
  minDate: any;
  diaSel: any;
  mesSel: any;
  anoSel: any;
  horaSel: any;
  minutoSel: any;
  dataMax: string;
  dataVal: any;
  horaSelecionada: any;
  agendaQuant: any;
  agendaCheck: number;
  agendaAberta: any;
  valorAtual: any;
  precoservicos: any;

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(ev) {
    this.valorAtual = String(ev.target.value)
    this.precoservicos = this.firestore.collection('servicos', ref => ref.where('id', '==', this.valorAtual)).valueChanges();
  }

  servicos: any
  profissionais: any
  now: any
  datetime: any
  profissional: any

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    public auth: AngularFireAuth,
    private authService: AuthenticationService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
  ) { 
    this.minuteValues = '0';
    this.diaSel = new Date().getDate();
    this.mesSel = new Date().getMonth();
    this.anoSel = new Date().getFullYear();
    this.horaSel = String(new Date().getHours());
    this.horaSel = ('0'+this.horaSel).slice(-2)
    this.minutoSel = String(new Date().getMinutes());
    this.minutoSel = ('0'+this.minutoSel).slice(-2)
    this.dataSel = this.anoSel+'-'+(this.mesSel+1)+'-'+this.diaSel+'T'+'09'+':'+'00'+':00'
    this.dataVal = this.dataSel
    this.dataMax = this.anoSel+'-'+(this.mesSel+2)+'-'+this.diaSel+'T'+this.horaSel+':'+this.minutoSel+':00'
    console.log(this.dataSel)
    // this.minDate = new Date();
    this.servicos = firestore.collection('servicos').valueChanges();
    this.profissionais = firestore.collection('profissionais').valueChanges();
    this.horasDisp = ''; 
    this.agendaCheck = 0;
  }

  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Você possui mais de um agendamento em aberto!',
      buttons: [
        {
          text: 'Ok',
        },
      ],
    });

    await alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 200,
      spinner: 'circles',
    });

    loading.present();
  }

  
  ionViewWillEnter(){

    this.agendaCheck = 0

    this.authService.ngFireAuth.currentUser.then( user => {
      this.firestore.collection('agendamentos', ref => ref.
        where('user', '==', user.uid).
        where('status', '==', '1')).stateChanges().subscribe( c=> {
          
          this.agendaCheck = (c.length);
          
          if(this.agendaCheck==2){
            this.presentAlert();
            this.router.navigateByUrl('historico');
          }

        })
      })
}

ngOnInit() {
  }

  checkValue(event, data) { 
    this.hourValues ='';
    this.profissional = event.detail.value
    const dataSelect = new Date(data.value).toLocaleDateString();

    this.agendamentos = this.firestore.collection('agendamentos',ref => ref.
    where('profissional', '==', this.profissional).
    where('status', '==', '1').
    where('data', '==', dataSelect)).valueChanges();

    interface agenda {
      hora: any
    }

    this.hourValues ='09,10,11,13,14,15,16,17,18';

    this.agendamentos.subscribe((res: agenda[]) => {

        res.forEach((item) => {
          this.horasDisp = item.hora.substring(0,2)
          this.hourValues = this.hourValues.replace(this.horasDisp+',', '')
          this.hourValues = this.hourValues.replace(this.horasDisp, '')
        });
    })

    let horaNow = this.horaSel

    if(this.diaSel == dataSelect.substring(0,2)) {
      for(let i = 0; i<9; i++){
        horaNow = ('0'+horaNow).slice(-2)
        this.hourValues = this.hourValues.replace(String(horaNow)+',', '')
        this.hourValues = this.hourValues.replace(String(horaNow), '')
        horaNow-=1
      }
    }
}

canSave(): boolean{ 
  return this.profissional != null && 
  this.servicoSel != null &&
  this.hourValues.indexOf(this.horaSelecionada) > -1
}

checkValue2(event) { 
  this.hourValues ='';
  const dataSelect = new Date(event.value).toLocaleDateString();
  const horaSelect = new Date(event.value).toLocaleTimeString();

  this.agendamentos = this.firestore.collection('agendamentos',ref => ref.
  where('profissional', '==', this.profissional).
  where('status', '==', '1').
  where('data', '==', dataSelect)).valueChanges();

  interface agenda {
    hora: any
  }

  this.hourValues ='09,10,11,13,14,15,16,17,18';

  this.agendamentos.subscribe((res: agenda[]) => {

      res.forEach((item) => {
        this.horasDisp = item.hora.substring(0,2)
        this.hourValues = this.hourValues.replace(this.horasDisp+',', '')
        this.hourValues = this.hourValues.replace(this.horasDisp, '')
      });
  })

  let horaNow = this.horaSel
  
  if(this.diaSel == dataSelect.substring(0,2)) {
    for(let i = 0; i<10; i++){
      horaNow = ('0'+horaNow).slice(-2)
      this.hourValues = this.hourValues.replace(String(horaNow)+',', '')
      this.hourValues = this.hourValues.replace(String(horaNow), '')
      horaNow-=1
    }
  }

  this.horaSelecionada = ('0'+horaSelect.substring(0,2)).slice(-2)
}

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 && utcDay !== 6;
  };

  revisarServico(servico, dataehora) {
    const now = new Date(dataehora.value).toLocaleDateString();
    const nowtime = new Date(dataehora.value).toLocaleTimeString();
    const datetime = now
    const time = nowtime
    this.router.navigate(['confirmaservico'],{
      queryParams: [this.profissional,servico.value, datetime, time]
    })
  }

}
