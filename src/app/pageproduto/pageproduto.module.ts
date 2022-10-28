import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageprodutoPageRoutingModule } from './pageproduto-routing.module';

import { PageprodutoPage } from './pageproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageprodutoPageRoutingModule
  ],
  declarations: [PageprodutoPage]
})
export class PageprodutoPageModule {}
