import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertButton, AlertController, Platform } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {

  constructor(private locationStrategy: LocationStrategy,
    private alertCtrl: AlertController,
    private auth: AuthServiceService,
    private plt: Platform) { }

  ngOnInit() {
  
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
}

approveOrder(data) {
  console.log("approved", data)
}
cancelOrder(data) {
  console.log("cancelled", data)
}
logout() {
this.alertCtrl.create({
  message: 'Are you sure you want to logout?',
  buttons: [
    {
      text: 'Yes',
      handler: () => {
        this.auth.SignOut()
      }
    },
    {
      text: 'No',
      role: "cancel"
    }
  ]
}).then(el => {
  el.present()
})
}
}
