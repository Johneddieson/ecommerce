import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page implements OnInit {
  productReference: AngularFirestoreCollection
  sub
  allPendingOrders: any[] = []
  
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.productReference = this.afstore.collection('History')

        this.sub = this.productReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {

            console.log("all orders", data)

            data = data.map((i, index) => {
              return Object.assign({
                BillingAddress1: i.BillingAddress1,
                BillingAddress2: i.BillingAddress2,
                BillingFirstname: i.BillingFirstname,
                BillingIndexId: i.BillingIndexId,
                BillingLastname: i.BillingLastname,
                BillingPhonenumber: i.BillingPhonenumber,
                Billingemail: i.Billingemail,
                Datetime: i.Datetime,
                Status: i.Status == "Closed" ? "Approved" : "Cancelled",
                TotalAmount: i.TotalAmount,
                id: i.id,
                DatetimeToSort: i.DatetimeToSort,
                OrderDetails: i.OrderDetails
              })
            })
            data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))

            console.log("the data", data)
            this.allPendingOrders = data
          })
      }
    })
  }

  ngOnInit() {
  }


  addproduct() {
    this.alertCtrl.create({
      header: 'Choose',
      inputs: [
        {
          type: 'radio',
          label: 'POS',
          value: 'POS'

        },
        {
          type: 'radio',
          label: 'View Products',
          value: 'View Products'

        },
        {
          type: 'radio',
          label: 'Add Product',
          value: 'Add Product'

        },
        // {
        //   type: 'radio',
        //   label: 'Edit Information',
        //   value: 'Edit Information'

        // },
        {
          type: 'radio',
          label: 'Change Password',
          value: 'Change Password'

        },
      ],
      buttons: [
        {
          text: 'Go',
          handler: data => {
            console.log("data", data)
            if (data == "View Products") {
              this.router.navigateByUrl('/viewproducts')  
            } else if (data == "Add Product") {

              this.router.navigateByUrl('/add-product')
            } else if (data == "POS") {
              this.router.navigateByUrl('/createpos')
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })
  }

}
