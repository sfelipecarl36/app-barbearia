import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuralPage } from './mural.page';

const routes: Routes = [
  {
    path: '',
    component: MuralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuralPageRoutingModule {}
