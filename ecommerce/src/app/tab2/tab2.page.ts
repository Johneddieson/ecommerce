import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  notificationsReference: AngularFirestoreCollection
  sub
notificationsList : any[] = []
notifCounts = 0
myid: string
  constructor(private router: Router, private afstore: AngularFirestore,
    private afauth: AngularFireAuth, private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, private auth: AuthServiceService,
    private alertCtrl: AlertController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.myid = data.uid
        if (data.displayName == 'admin') {
          router.navigateByUrl('adminpage')
        } else {
          router.navigateByUrl('tabs')
        }

        this.notificationsReference = this.afstore.collection(`users/${data.uid}/notifications`)

        this.sub = this.notificationsReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            data = data.map((i, index) => {
              return Object.assign({
                id: i.id,
                Datetime: i.Datetime,
                DatetimeToSort: i.DatetimeToSort,
                read: i.read,
                remarks: i.remarks,
                Message: i.Message
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
            this.notificationsList = data

            console.log("wewewew", this.notificationsList)
            var filterOnlyNotRead = data.filter(f => f.read != true)
              this.notifCounts = filterOnlyNotRead.length
              console.log("count", this.notifCounts)
          })
      }
    })
  }
  ngOnInit(): void {
      
  }
  update(item) {
    console.log("edited", this.myid)

    this.afstore.doc(`users/${this.myid}/notifications/${item.id}`).update({
      read: true
    })

  }

}
