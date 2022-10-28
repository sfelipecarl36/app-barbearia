import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageprodutoPage } from './pageproduto.page';

const routes: Routes = [
  {
    path: '',
    component: PageprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageprodutoPageRoutingModule {}
