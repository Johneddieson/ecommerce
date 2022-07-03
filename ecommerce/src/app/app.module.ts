import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthServiceService} from '../app/auth-service.service';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCkwW8YBuDVVAVczXR9b4HsITlR17fiU8U",
      authDomain: "thesisamatugue.firebaseapp.com",
      projectId: "thesisamatugue",
      storageBucket: "thesisamatugue.appspot.com",
      messagingSenderId: "412207897516",
      appId: "1:412207897516:web:3f353ca8a23f46df653809",
      measurementId: "G-949B7C6RY3"
    }),
    AngularFirestoreModule],
  providers: [AuthGuard, AuthServiceService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
