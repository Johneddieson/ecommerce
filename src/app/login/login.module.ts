import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth/auth.module';
import { DbserviceService } from '../services/dbservice.service';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [DbserviceService]
})
export class LoginPageModule {}
