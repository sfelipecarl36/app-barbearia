import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageservicoPageRoutingModule } from './pageservico-routing.module';

import { PageservicoPage } from './pageservico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageservicoPageRoutingModule
  ],
  declarations: [PageservicoPage]
})
export class PageservicoPageModule {}
