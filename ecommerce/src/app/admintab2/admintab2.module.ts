import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admintab2PageRoutingModule } from './admintab2-routing.module';

import { Admintab2Page } from './admintab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admintab2PageRoutingModule
  ],
  declarations: [Admintab2Page]
})
export class Admintab2PageModule {}
