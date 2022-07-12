import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router, private afstore: AngularFirestore,
    private afauth: AngularFireAuth, private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, private auth: AuthServiceService,
    private alertCtrl: AlertController){}

}
