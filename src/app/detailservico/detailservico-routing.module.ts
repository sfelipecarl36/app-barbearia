import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailservicoPage } from './detailservico.page';

const routes: Routes = [
  {
    path: '',
    component: DetailservicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailservicoPageRoutingModule {}
