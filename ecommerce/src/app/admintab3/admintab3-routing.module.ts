import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admintab3Page } from './admintab3.page';

const routes: Routes = [
  {
    path: '',
    component: Admintab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admintab3PageRoutingModule {}
