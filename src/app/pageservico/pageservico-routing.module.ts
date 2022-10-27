import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageservicoPage } from './pageservico.page';

const routes: Routes = [
  {
    path: '',
    component: PageservicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageservicoPageRoutingModule {}
