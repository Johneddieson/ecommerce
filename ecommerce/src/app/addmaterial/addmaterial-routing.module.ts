import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmaterialPage } from './addmaterial.page';

const routes: Routes = [
  {
    path: '',
    component: AddmaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmaterialPageRoutingModule {}
