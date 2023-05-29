import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admintab2Page } from './admintab2.page';

const routes: Routes = [
  {
    path: '',
    component: Admintab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admintab2PageRoutingModule {}
