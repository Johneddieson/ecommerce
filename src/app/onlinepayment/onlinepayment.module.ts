import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinepaymentPageRoutingModule } from './onlinepayment-routing.module';

import { OnlinepaymentPage } from './onlinepayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinepaymentPageRoutingModule
  ],
  declarations: [OnlinepaymentPage]
})
export class OnlinepaymentPageModule {}
