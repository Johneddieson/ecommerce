import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { buffer, map } from 'rxjs/operators';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

notificationsList : any[] = []
notifCounts = 0
myid: any
subMeReference: any;
email: any;
  constructor(private router: Router, 
    //private afstore: AngularFirestore,
    //private afauth: AngularFireAuth, 
    private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, 
    //private auth: AuthServiceService,
    private alertCtrl: AlertController,
    private applicationRef: ApplicationRef,
    private zone: NgZone) 
    {
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //     this.myid = data.uid
    //     this.notificationsReference = this.afstore.collection(`users/${data.uid}/notifications`)

    //     this.sub = this.notificationsReference.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => {
    //         return {
    //           id: a.payload.doc.id,
    //           ...a.payload.doc.data() as any
    //         }
    //       }))).subscribe(async data => {
    //         data = data.map((i, index) => {
    //           return Object.assign({
    //             id: i.id,
    //             Datetime: i.Datetime,
    //             DatetimeToSort: i.DatetimeToSort,
    //             read: i.read,
    //             remarks: i.remarks,
    //             Message: i.Message,
    //             OrderId: i.OrderId
    //           })
    //         })
    //         data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
    //         this.notificationsList = data

    //         var filterOnlyNotRead = data.filter(f => f.read != true)
    //           this.notifCounts = filterOnlyNotRead.length
    //       })
      
      
    //   this.meReference = this.afstore.doc(`users/${data.uid}`)

    //   this.subMeReference = this.meReference.valueChanges().subscribe(data => {
    //       this.email = data.Email;
    //   })
    //     }
    // })
  }
  async ngOnInit() {
    var alertControllerSendFeedBack = await this.alertCtrl.create({
      message: 'You can send your feedback to us, we will appreciate your comments thanks!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    })
    await alertControllerSendFeedBack.present()
  }
  update(item: any) 
  {
    // console.log("edited", this.myid)
    // this.afstore.doc(`users/${this.myid}/notifications/${item.id}`).update({
    //   read: true
    // })
  }


  async sendFeedBack(dataOrders: any)
  {
    
    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
      var alertSendFeedBack = await this.alertCtrl.create({
        header: 'Send your feedback to this order',
        inputs: [
        {
          type: 'textarea',
        }
        ],
        buttons: [
          {
            text: 'Send',
            handler: async (feedbackMessage) => {
            var alertAreyouSureWantToSend = await this.alertCtrl.create({
              message: 'Are you sure you want to send your feedback to this order?',
              buttons: [
                {
                  text: 'Yes',
                  handler: () => 
                  {
                      // this.OrderDocuments = this.afstore.doc(
                      //   `Orders/${dataOrders.OrderId}`
                      // );

                      // var sub = this.OrderDocuments.get()
                      // .pipe(map(actions => {
                      //   return {
                      //     id: actions.id,
                      //     ...actions.data() as any
                      //   }
                      // }))
                      // .subscribe(
                      //   (data) => {
                      //     this.afstore.collection('FeedBacks').add({
                      //       Message: feedbackMessage,
                      //       DateTime: datetime,
                      //       DateTimeToSort: new Date(),
                      //       Read: false,
                      //       Email: this.email,
                      //       Orders: data.OrderDetails
                      //     }).then(async el => {
                      //       this.afstore.doc(`users/${this.myid}/notifications/${dataOrders.id}`).update({
                      //         read: true
                      //       })

                      //      var feedBackSentAlert = await this.alertCtrl.create({
                      //       message: 'Feedback sent successfully!',
                      //       buttons: [
                      //         {
                      //           text: 'Ok',
                      //           role: 'cancel'
                      //         }
                      //       ]
                      //      })
                      //      await feedBackSentAlert.present()   
                      //     })
                      //   }
                      // );
                  }
                },
                {
                  text: 'No',
                  role: 'cancel'
                }
              ]
            })
            await alertAreyouSureWantToSend.present()
            }
          },
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      })
      await alertSendFeedBack.present();
  }

}
