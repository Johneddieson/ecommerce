import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmaterialPageRoutingModule } from './addmaterial-routing.module';

import { AddmaterialPage } from './addmaterial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmaterialPageRoutingModule
  ],
  declarations: [AddmaterialPage]
})
export class AddmaterialPageModule {}
