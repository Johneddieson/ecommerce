import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainpage',
    pathMatch: 'full',
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
   
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'adminpage',
    loadChildren: () => import('./adminpage/adminpage.module').then( m => m.AdminpagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viewproducts',
    loadChildren: () => import('./viewproducts/viewproducts.module').then( m => m.ViewproductsPageModule),
    canActivate: [AuthGuard]
 
  },
  {
    path: 'editproduct/:id',
    loadChildren: () => import('./editproduct/editproduct.module').then( m => m.EditproductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'createpos',
    loadChildren: () => import('./createpos/createpos.module').then( m => m.CreateposPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'admincheckout',
    loadChildren: () => import('./admincheckout/admincheckout.module').then( m => m.AdmincheckoutPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'mainpage',
    loadChildren: () => import('./mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'inventory',
     loadChildren: () => import("./admintab3/admintab3.module").then(m => m.Admintab3PageModule),
     canActivate: [AuthGuard]
  },
  {
    path: 'addmaterial',
    loadChildren: () => import('./addmaterial/addmaterial.module').then( m => m.AddmaterialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viewmaterials',
    loadChildren: () => import('./viewmaterials/viewmaterials.module').then( m => m.ViewmaterialsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vieworderbyid/:id',
    loadChildren: () => import('./vieworderbyid/vieworderbyid.module').then( m => m.VieworderbyidPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historybyid/:id',
    loadChildren: () => import('./historybyid/historybyid.module').then( m => m.HistorybyidPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'userinformation',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kitchen',
    loadChildren: () => import('./kitchen/kitchen.module').then( m => m.KitchenPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rider',
    loadChildren: () => import('./rider/rider.module').then( m => m.RiderPageModule),
    canActivate: [AuthGuard]
  },


  // {
  //   path: 'onlinepayment',
  //   loadChildren: () => import('./onlinepayment/onlinepayment.module').then( m => m.OnlinepaymentPageModule)
  // },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
