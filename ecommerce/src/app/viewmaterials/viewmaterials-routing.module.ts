import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewmaterialsPage } from './viewmaterials.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmaterialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewmaterialsPageRoutingModule {}
