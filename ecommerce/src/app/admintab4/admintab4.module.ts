import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admintab4PageRoutingModule } from './admintab4-routing.module';

import { Admintab4Page } from './admintab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admintab4PageRoutingModule
  ],
  declarations: [Admintab4Page]
})
export class Admintab4PageModule {}
