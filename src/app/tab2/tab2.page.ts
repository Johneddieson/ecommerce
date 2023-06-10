import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { buffer, map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
import * as _ from 'lodash';
import { collection } from 'firebase/firestore';
import { Firestore, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
orderedProducts: any[] = []
  constructor(private router: Router, 
    private loadingCtrl: LoadingController,
    private locationStrategy: LocationStrategy, 
    private alertCtrl: AlertController,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private afauth: AngularFireAuth,
    private dbservice: DbserviceService,
    private firestore: Firestore
    ) 
    {
        this.afauth.authState.subscribe((dataAuth) => 
        {
          if (dataAuth?.uid && dataAuth)
          {
            this.email = dataAuth.email;
            this.getCurrentUserHistory(dataAuth)
          }
        })
    }

    getCurrentUserHistory(dataAuth: any)
    {
      this.dbservice.getData('History').subscribe((data) => 
      {
          var currentuserAllOrders = data.filter(f => f.BillingIndexId == dataAuth.uid);
          var currentuserAllOrderDetails = currentuserAllOrders.map((data: any) => {return data.OrderDetails});
        var flatAllOrderDetails =   _.flatten(currentuserAllOrderDetails)
    
        var list = _(flatAllOrderDetails)
        .groupBy('id')
        .map((items, id) => (  id             
      )).value();
      this.getAllOrderedProducts(list)
    })
    }

    getAllOrderedProducts(idarraystring: any)
    {
        this.dbservice.getDataAny('Products', idarraystring).subscribe((data) => 
        {
          this.orderedProducts = data
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


  async writefeedback(data: any)
  {
      var alertWriteFeedBack = await this.alertCtrl.create
      ({
        header: 'Write some comments on this product',
        backdropDismiss: false,
        inputs: 
        [
          {
            type: 'textarea',
            label: 'comments',
            name: 'comments',
            placeholder: 'Enter some comments...'
          }
        ],
        buttons: 
        [
          {
            text: 'Submit',
            handler:  (datacomments) => 
            {
              if (datacomments.comments == '')
              {
                alert("comments shouldn't be empty")
              }
              else if (datacomments.comments.length < 3)
              {
                alert("comments should be 3 minimum characters")
              }
              else 
              {
                var feedbackobj = 
                {
                  DatetimeToSort: new Date(),
                  Datetime: moment(new Date()).format('MM-DD-YYYY hh:mm A'),
                  ProductName: data.ProductName,
                  Category: data.Category,
                  ImageUrl: data.ImageUrl,
                  Comments: datacomments.comments,
                  CustomerEmail: this.email,
                  read: false
                }
                  this.dbservice.postData('Feedbacks', feedbackobj)
                  .then(async (el) => 
                  {

                    var sendFeedbackAlertSuccess = await this.alertCtrl.create
                    ({
                      message: 'Your comments has been submitted.',
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]
                    })
                    await sendFeedbackAlertSuccess.present();
                  })
              }
            }
          },
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      })      
  await alertWriteFeedBack.present();
    }

}
