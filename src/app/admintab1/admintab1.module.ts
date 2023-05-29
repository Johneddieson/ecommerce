import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admintab1PageRoutingModule } from './admintab1-routing.module';

import { Admintab1Page } from './admintab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admintab1PageRoutingModule
  ],
  declarations: [Admintab1Page]
})
export class Admintab1PageModule {}
