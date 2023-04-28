import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewmaterialsPageRoutingModule } from './viewmaterials-routing.module';

import { ViewmaterialsPage } from './viewmaterials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmaterialsPageRoutingModule
  ],
  declarations: [ViewmaterialsPage]
})
export class ViewmaterialsPageModule {}
