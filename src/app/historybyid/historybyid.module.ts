import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorybyidPageRoutingModule } from './historybyid-routing.module';

import { HistorybyidPage } from './historybyid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorybyidPageRoutingModule
  ],
  declarations: [HistorybyidPage]
})
export class HistorybyidPageModule {}
