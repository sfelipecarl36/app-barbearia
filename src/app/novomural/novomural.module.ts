import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovomuralPageRoutingModule } from './novomural-routing.module';

import { NovomuralPage } from './novomural.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovomuralPageRoutingModule
  ],
  declarations: [NovomuralPage]
})
export class NovomuralPageModule {}
