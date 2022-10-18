import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmaservicoPage } from './confirmaservico.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmaservicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmaservicoPageRoutingModule {}
