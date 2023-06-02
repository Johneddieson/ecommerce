import { map } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertButton, AlertController, Platform } from '@ionic/angular';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {
//sub
feedbackLength: number = 0
  constructor(private locationStrategy: LocationStrategy,
    private alertCtrl: AlertController,
    //private auth: AuthServiceService,
    private plt: Platform,
    private auth: AuthserviceService
    //private afstore: AngularFirestore,
    //private afauth: AngularFireAuth
    ) 
    {
      // this.afauth.authState.subscribe(data => {
      //   if (data && data.uid)
      //   {
      //     this.feedBackCollection = this.afstore.collection('FeedBacks')

      // this.sub = this.feedBackCollection.snapshotChanges()
      // .pipe(map(actions => actions.map(a => {
      //   return {
      //     id: a.payload.doc.id,
      //     ...a.payload.doc.data() as any
      //   }
      // })))
      // .subscribe(data => {
      //   data = data.filter(f => f.Read == false)
      //     this.feedbackLength = data.length
      // })
      //   }
      // })

     }

  ngOnInit() {
  
    // history.pushState(null, null, location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState(null, null, location.href);
    // })
}

approveOrder(data: any) {
  console.log("approved", data)
}
cancelOrder(data: any) {
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
