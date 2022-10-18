import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmaservicoPageRoutingModule } from './confirmaservico-routing.module';

import { ConfirmaservicoPage } from './confirmaservico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmaservicoPageRoutingModule
  ],
  declarations: [ConfirmaservicoPage]
})
export class ConfirmaservicoPageModule {}
