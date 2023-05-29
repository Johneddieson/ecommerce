import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmincheckoutPageRoutingModule } from './admincheckout-routing.module';

import { AdmincheckoutPage } from './admincheckout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmincheckoutPageRoutingModule
  ],
  declarations: [AdmincheckoutPage]
})
export class AdmincheckoutPageModule {}
