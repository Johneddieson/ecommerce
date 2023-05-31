import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { buffer, map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
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
    private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, 
    private alertCtrl: AlertController,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private afauth: AngularFireAuth,
    private dbservice: DbserviceService) 
    {
        this.afauth.authState.subscribe((dataAuth: any) => 
        {
          if (dataAuth.uid)
          {
              this.dbservice.getData('Orders').subscribe((data) => 
              {
                  var currentuserAllOrders = data.filter(f => f.BillingIndexId == dataAuth.uid);
                  //console.log("current user all orders", currentuserAllOrders)
                  var currentuserAllOrderDetails = currentuserAllOrders.map((data: any) => {return data.OrderDetails});
                  // console.log("current user all orderdetails", currentuserAllOrderDetails)
                  currentuserAllOrderDetails.forEach(fe => 
                    {
                      console.log("order details", fe)
                    })
                })
          }
        })
    }
  async ngOnInit() 
  {
    // var alertControllerSendFeedBack = await this.alertCtrl.create({
    //   message: 'You can send your feedback to us, we will appreciate your comments thanks!',
    //   buttons: [
    //     {
    //       text: 'Ok',
    //       role: 'cancel'
    //     }
    //   ]
    // })
    // await alertControllerSendFeedBack.present()
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
