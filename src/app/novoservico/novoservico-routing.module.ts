import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoservicoPage } from './novoservico.page';

const routes: Routes = [
  {
    path: '',
    component: NovoservicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoservicoPageRoutingModule {}
