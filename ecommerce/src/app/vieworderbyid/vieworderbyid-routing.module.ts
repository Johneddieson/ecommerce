import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VieworderbyidPage } from './vieworderbyid.page';

const routes: Routes = [
  {
    path: '',
    component: VieworderbyidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VieworderbyidPageRoutingModule {}
