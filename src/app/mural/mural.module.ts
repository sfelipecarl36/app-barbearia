import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuralPageRoutingModule } from './mural-routing.module';

import { MuralPage } from './mural.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuralPageRoutingModule
  ],
  declarations: [MuralPage]
})
export class MuralPageModule {}
