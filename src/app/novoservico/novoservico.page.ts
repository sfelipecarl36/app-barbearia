import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { getAuth, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  // isWeekday = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const utcDay = date.getUTCDay();

  //   /**
  //    * Date will be enabled if it is not
  //    * Sunday or Saturday
  //    */
  //   return utcDay !== 0 && utcDay !== 6;
  // };

  logs: string[] = [];

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.pushLog('Valor: R$' + e.detail.value);
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
    private firestore: AngularFirestore
  ) { 

    this.servicos = firestore.collection('servicos').valueChanges();
    this.profissionais = firestore.collection('profissionais').valueChanges();
    console.log(this.profissional)
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 450,
      spinner: 'circles',
    });

    loading.present();
  }

  ionViewWillEnter(){
    this.showLoading()
  }

  ngOnInit() {
  }

  checkValue(event) { 
    console.log(event.detail.value)
    this.profissional = event.detail.value
  }

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
