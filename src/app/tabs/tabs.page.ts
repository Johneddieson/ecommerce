import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthserviceService } from '../services/authservice.service';
import { DbserviceService } from '../services/dbservice.service';
import { PaymongoService } from '../services/paymongo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
sub: any
notificationsList : any[] = []
notifCounts = 0
subDocument: any;
myid: string = ''
  constructor(private router: Router, 
    private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, 
    private alertCtrl: AlertController,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private auth: AuthserviceService,
    private dbservice: DbserviceService,
    private paymongoservice: PaymongoService,
    private afauth: AngularFireAuth
    ) 
    {
      this.afauth.authState.subscribe((user) => 
      {
        if (user && user.uid)
        {
          this.myid = user.uid
        }
      })
    }


  ngOnInit(): void 
  {

  }
  async logout() 
  {
    var alertLogout = await this.alertCtrl.create
    ({
      message: 'Are you sure you want to logout?',
      buttons: 
      [
        {
          text: 'Yes',
          handler: () => 
          { 
              this.auth.SignOut();
              this.clearShippingDetails();
            }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    })
    await alertLogout.present();
  }
  clearShippingDetails()
{
  var specificData = 
  {
    PhoneNumber: "",
    FirstName: "",
    LastName: "",
    Address1: ""
  }
  this.dbservice.updateData(this.myid, specificData, 'users')
}
}
