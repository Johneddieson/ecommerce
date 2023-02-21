import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminpagePage } from './adminpage.page';

const routes: Routes = [
  {
    path: '',
    component: AdminpagePage,
    children: [
      {
        path: 'atab1',
        loadChildren: () => import("../admintab1/admintab1.module").then(m => m.Admintab1PageModule)
      },
      {
        path: 'atab2',
        loadChildren: () => import("../admintab2/admintab2.module").then(m => m.Admintab2PageModule)
      },
      {
        path: 'atab3',
        // loadChildren: () => import("../admintab3/admintab3.module").then(m => m.Admintab3PageModule)
        loadChildren: () => import('../customerfeedback/customerfeedback.module').then( m => m.CustomerfeedbackPageModule)
      },
      {
        path: 'atab4',
        loadChildren: () => import("../admintab4/admintab4.module").then(m => m.Admintab4PageModule)
      },
      {
        path: '',
        redirectTo: '/adminpage/atab1'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminpagePageRoutingModule {}
