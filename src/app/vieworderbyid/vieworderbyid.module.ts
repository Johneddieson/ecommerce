import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VieworderbyidPageRoutingModule } from './vieworderbyid-routing.module';

import { VieworderbyidPage } from './vieworderbyid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VieworderbyidPageRoutingModule
  ],
  declarations: [VieworderbyidPage]
})
export class VieworderbyidPageModule {}
