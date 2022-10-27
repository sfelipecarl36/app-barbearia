import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LojaPageRoutingModule } from './loja-routing.module';

import { LojaPage } from './loja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LojaPageRoutingModule
  ],
  declarations: [LojaPage]
})
export class LojaPageModule {}
