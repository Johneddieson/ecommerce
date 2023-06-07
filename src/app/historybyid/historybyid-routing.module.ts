import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorybyidPage } from './historybyid.page';

const routes: Routes = [
  {
    path: '',
    component: HistorybyidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorybyidPageRoutingModule {}
