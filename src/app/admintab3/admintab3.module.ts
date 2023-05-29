import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admintab3PageRoutingModule } from './admintab3-routing.module';

import { Admintab3Page } from './admintab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admintab3PageRoutingModule
  ],
  declarations: [Admintab3Page]
})
export class Admintab3PageModule {}
