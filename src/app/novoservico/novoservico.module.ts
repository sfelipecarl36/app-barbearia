import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoservicoPageRoutingModule } from './novoservico-routing.module';

import { NovoservicoPage } from './novoservico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoservicoPageRoutingModule
  ],
  declarations: [NovoservicoPage]
})
export class NovoservicoPageModule {}
