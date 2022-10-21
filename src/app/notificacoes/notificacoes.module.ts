import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacoesPageRoutingModule } from './notificacoes-routing.module';

import { NotificacoesPage } from './notificacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacoesPageRoutingModule
  ],
  declarations: [NotificacoesPage]
})
export class NotificacoesPageModule {}
