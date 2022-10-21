import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacoesPage } from './notificacoes.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacoesPageRoutingModule {}
