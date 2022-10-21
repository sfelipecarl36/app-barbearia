import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovomuralPage } from './novomural.page';

const routes: Routes = [
  {
    path: '',
    component: NovomuralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovomuralPageRoutingModule {}
