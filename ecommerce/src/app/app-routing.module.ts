import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthForLoginSignupGuard } from './auth-for-login-signup.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // },
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
  // {
  //   path: 'changepassword',
  //   loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
  //   canActivate: [AuthGuard]
  // },
  
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  // },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  // }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
