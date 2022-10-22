import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CategoryPage } from '../category/category.page';
import { CategoryPageModule } from '../category/category.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    CategoryPageModule
  ],
  exports: [HeaderComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
})
export class SharedComponentsModule { }
