import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PaginationModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
