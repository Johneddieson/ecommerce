import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateposPage } from './createpos.page';

const routes: Routes = [
  {
    path: '',
    component: CreateposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateposPageRoutingModule {}
