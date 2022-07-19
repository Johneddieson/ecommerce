import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateposPageRoutingModule } from './createpos-routing.module';

import { CreateposPage } from './createpos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateposPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateposPage]
})
export class CreateposPageModule {}
