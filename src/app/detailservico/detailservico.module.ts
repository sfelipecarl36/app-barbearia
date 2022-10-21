import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailservicoPageRoutingModule } from './detailservico-routing.module';

import { DetailservicoPage } from './detailservico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailservicoPageRoutingModule
  ],
  declarations: [DetailservicoPage]
})
export class DetailservicoPageModule {}
