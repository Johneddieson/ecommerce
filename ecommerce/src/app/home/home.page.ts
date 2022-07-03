import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numbers = 0;
showLog = false
  constructor(private alertCtrl: AlertController, private auth: AuthServiceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth) {

    this.afauth.authState.subscribe(user => {

      if (user && user.uid) {
      }
    })
   }

  ngOnInit() {
    this.numbers = 1
  }

  Increase() {
    return this.numbers++;
    
  }
  Decrease() {
    if (this.numbers == 1) {
this.alertCtrl.create({
  message: "The Quantity should'nt be zero",
  buttons: ["Ok"]
}).then(el => {
  el.present()
})
return this.numbers = 1;
    } else {
      return this.numbers--;

    }
  }
}
