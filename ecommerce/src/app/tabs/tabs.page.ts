import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({  
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private router: Router,private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
   private locationStrategy: LocationStrategy, private auth: AuthServiceService,
   private alertCtrl: AlertController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        if (data.displayName == 'admin') {
          router.navigateByUrl('adminpage')
        } else {
          router.navigateByUrl('tabs')
        }
      }
    })
   }


  ngOnInit(): void {
    history.pushState(null, null, location.href);
this.locationStrategy.onPopState(() => {
  history.pushState(null, null, location.href);
})
  }
  logout() {
    this.alertCtrl.create({
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            
    this.auth.SignOut()  
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })
  }
}
