import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admintab1Page } from './admintab1.page';

const routes: Routes = [
  {
    path: '',
    component: Admintab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admintab1PageRoutingModule {}
