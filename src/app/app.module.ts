import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth'
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'
import { DbserviceService } from './services/dbservice.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot({innerHTMLTemplatesEnabled: true}), 
    AppRoutingModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule
    // AngularFireModule.initializeApp
    // ({
    // apiKey: 'AIzaSyCkwW8YBuDVVAVczXR9b4HsITlR17fiU8U',
    // authDomain: 'thesisamatugue.firebaseapp.com',
    // projectId: 'thesisamatugue',
    // storageBucket: 'thesisamatugue.appspot.com',
    // messagingSenderId: '412207897516',
    // appId: '1:412207897516:web:3f353ca8a23f46df653809',  
    // }),
  ],
  providers: 
  [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
  DbserviceService,
    {
      provide: FIREBASE_OPTIONS, 
      useValue: environment.firebase
    }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
