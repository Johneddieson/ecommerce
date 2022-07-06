import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admintab4Page } from './admintab4.page';

const routes: Routes = [
  {
    path: '',
    component: Admintab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admintab4PageRoutingModule {}
