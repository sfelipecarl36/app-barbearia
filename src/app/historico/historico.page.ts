import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from "../shared/authentication-service";
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: -50,
      stretch: 1,
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
  
  profissionais: any;
  agendamentos: any;
  agend: any;
  nomeprof: any
  servicos: any;
  barbeiro: any;
  useruid: any;
  status: any;
  

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    public auth: AngularFireAuth
  ) { 

    

    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
      this.useruid = authService.userUid
      this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15)
      // .orderBy('id', 'desc')
      .where('user', '==', authService.userUid));

      this.agendamentos = this.agend.valueChanges()
      this.profissionais = this.firestore.collection('profissionais').valueChanges();
      this.status = this.firestore.collection('status', ref => ref.orderBy('id', 'asc')).valueChanges();
      this.servicos =  this.firestore.collection('servicos', ref => ref.limit(100).orderBy('id', 'desc')).valueChanges();
    }

    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      duration: 1800,
      spinner: 'circles',
    });

    loading.present();
  }

  detalhar(servico, profissional, data, hora, pagamento, docId, status) {
    this.router.navigate(['detailservico'],{
    queryParams: [servico, profissional, data, hora, pagamento, docId, status]
    })
  }

  ionViewDidLoad(){
    this.showLoading()
  }

  segmentChanged(e){
    if(this.authService.userUid.length<1){
      this.router.navigateByUrl('inicio')
    }
    else{
    this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15).
    orderBy('id', 'desc').where('status', '==',String(e.detail.value)).where('user', '==',this.authService.userUid));

    this.agendamentos = this.agend.valueChanges()
    }
    
  }

}
