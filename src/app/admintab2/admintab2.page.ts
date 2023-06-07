import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';
@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page implements OnInit {
  allPendingOrders: any[] = []
  
  constructor(
    //private afstore: AngularFirestore, 
    private afauth: AngularFireAuth,
    private router: Router,
    //private currencyPipe: CurrencyPipe,
    private dbservice: DbserviceService,
    private alertCtrl: AlertController,
    private paymongoservice: PaymongoService
    ) 
    {
      this.afauth.authState.subscribe((data: any) => 
      {
        if (data.uid)
        {
          this.dbservice.getData('History')
          .subscribe((dataHistory) => 
          {
            //paymongoservice.retrievePaymentLink()
            dataHistory.map((i, index) => 
            {

              if (i.PaymentMethod != 'Cash')
                {
                  i.paymentLink = `https://pm.link/Dmixologist/${i.paymentReference}`
                  setInterval(() => 
                  {
                    paymongoservice.retrievePaymentLink(i.paymentReference).subscribe((paymentretrieve) => 
                  {
                    i.paymentStatus = paymentretrieve.data.attributes.status
                     
                  })
                  },300)

                }
                else 
                {
                  i.paymentStatus = 'COD'
                  i.paymentLink = 'COD'
                }
              
      
            })
            
            // dataHistory = dataHistory.map((i, index) => {

            //           return Object.assign({
            //             BillingAddress1: i.BillingAddress1,
            //             BillingAddress2: i.BillingAddress2,
            //             BillingFirstname: i.BillingFirstname,
            //             BillingIndexId: i.BillingIndexId,
            //             BillingLastname: i.BillingLastname,
            //             BillingPhonenumber: i.BillingPhonenumber,
            //             Billingemail: i.Billingemail,
            //             Datetime: i.Datetime,
            //             Status: i.Status,
            //             TotalAmount: i.TotalAmount,
            //             id: i.id,
            //             DatetimeToSort: i.DatetimeToSort,
            //             OrderDetails: i.OrderDetails,
            //             Discount: i.Discount,
            //             PaymentMethod: i.PaymentMethod,
            //             paymentLink: i.paymentLink
            //           })
            //         })
                    dataHistory = dataHistory.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
                    this.allPendingOrders = dataHistory
                    console.log("history", this.allPendingOrders)
          })
        }
      })
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //     this.productReference = this.afstore.collection('History')

    //     this.sub = this.productReference.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => {
    //         return {
    //           id: a.payload.doc.id,
    //           ...a.payload.doc.data() as any
    //         }
    //       }))).subscribe(data => {

    //         data = data.map((i, index) => {
    //           return Object.assign({
    //             BillingAddress1: i.BillingAddress1,
    //             BillingAddress2: i.BillingAddress2,
    //             BillingFirstname: i.BillingFirstname,
    //             BillingIndexId: i.BillingIndexId,
    //             BillingLastname: i.BillingLastname,
    //             BillingPhonenumber: i.BillingPhonenumber,
    //             Billingemail: i.Billingemail,
    //             Datetime: i.Datetime,
    //             Status: i.Status,
    //             TotalAmount: i.TotalAmount,
    //             id: i.id,
    //             DatetimeToSort: i.DatetimeToSort,
    //             OrderDetails: i.OrderDetails,
    //             Discount: i.Discount,
    //             PaymentMethod: i.PaymentMethod
    //           })
    //         })
    //         data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
    //         console.log("the data", data)
    //         this.allPendingOrders = data
    //       })
    //   }
    // })
  }

  ngOnInit() {
  }


  addproduct() {
    this.alertCtrl
      .create({
        header: 'Choose',
        inputs: [
          {
            type: 'radio',
            label: 'Add Material',
            value: 'Add Material',
          },
          {
            type: 'radio',
            label: 'Add Product',
            value: 'Add Product',
          },
          {
            type: 'radio',
            label: 'POS',
            value: 'POS',
          },
          {
            type: 'radio',
            label: 'View Materials',
            value: 'View Materials',
          },
          {
            type: 'radio',
            label: 'View Products',
            value: 'View Products',
          },
        ],
        buttons: [
          {
            text: 'Go',
            handler: (data) => {
              if (data == 'View Products') {
                this.router.navigateByUrl('/viewproducts');
              } 
              else if (data == 'Add Material') {
                this.router.navigateByUrl('/addmaterial');
              }
              else if (data == 'Add Product') {
                this.router.navigateByUrl('/add-product');
              }
              else if (data == 'View Materials') {
                this.router.navigateByUrl('/viewmaterials');
              }
              else if (data == 'POS') {
                this.router.navigateByUrl('/createpos');
              } 
              // else if (data == 'Inventory') {
              //   this.router.navigateByUrl('/inventory');
              // }
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((el) => {
        el.present();
      });
  }

}
