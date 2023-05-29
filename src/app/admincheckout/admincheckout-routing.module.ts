import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmincheckoutPage } from './admincheckout.page';

const routes: Routes = [
  {
    path: '',
    component: AdmincheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmincheckoutPageRoutingModule {}
