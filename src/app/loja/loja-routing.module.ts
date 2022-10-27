import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LojaPage } from './loja.page';

const routes: Routes = [
  {
    path: '',
    component: LojaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojaPageRoutingModule {}
