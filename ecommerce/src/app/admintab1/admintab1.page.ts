import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, IonAccordionGroup } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import * as firebase from 'firebase/app'
import { Button } from 'protractor';
@Component({
  selector: 'app-admintab1',
  templateUrl: './admintab1.page.html',
  styleUrls: ['./admintab1.page.scss'],
})
export class Admintab1Page implements OnInit {
  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  productReference: AngularFirestoreCollection
  sub
  allPendingOrders: any[] = []
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.productReference = this.afstore.collection('Orders', ref => ref.where("Status", "==", "Open"))

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
                Status: i.Status,
                TotalAmount: i.TotalAmount,
                id: i.id,
                DatetimeToSort: moment(i.Datetime).toDate(),
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
          label: 'View Products',
          value: 'View Products'

        },
        {
          type: 'radio',
          label: 'Add Product',
          value: 'Add Product'

        },
        {
          type: 'radio',
          label: 'Edit Information',
          value: 'Edit Information'

        },
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
            } else if (data == "Edit Information") {

            } else if (data == "Change Password") {

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

  closeAccordion() {
    this.accordionGroup.value = ''
    
  }
  toggleSection() {
    this.accordionGroup.value = 'frameworks'
  }
  approveOrder(data) {

    this.alertCtrl.create({
      header: 'Question',
      message: 'Are you sure you want to approve this order?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

            //Update order to Closed
            this.afstore.doc(`Orders/${data.id}`).update({
              Status: 'Closed'
            })

            //User Notification Approved

            var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "").split('0.00')[0]
            var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
            var confirmed = `Your order has been confirmed by the admin. ${items}. Total amount of ₱${totalAmount}`
            this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
              Message: confirmed,
              Datetime: datetime,
              read: false,
              remarks: "Your order has been confirmed"
            })

            //Decreasing Stocks
            data.OrderDetails.forEach(fe => {
              //console.log("order details", fe)
              this.afstore.doc(`Products/${fe.id}`).update({
                Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity)
              })
            })

            //Inventory Saving

            data.OrderDetails.forEach(fe => {
              this.afstore.collection('Inventory').add({
                Quantity: parseInt(fe.Quantity) * -1,
                Datetime: datetime,
                read: false,
                Destination: data.BillingFirstname + " " + data.BillingLastname,
                ProductName: fe.ProductName,
                UnitPrice: fe.UnitPrice,
                ImageUrl: fe.ImageUrl
              })
            })

            //History Saving
            this.afstore.collection('History').add({
              BillingAddress1: data.BillingAddress1,
              BillingAddress2: data.BillingAddress2,
              BillingFirstname: data.BillingFirstname,
              BillingIndexId: data.BillingIndexId,
              BillingLastname: data.BillingLastname,
              BillingPhonenumber: data.BillingPhonenumber,
              Billingemail: data.Billingemail,
              Datetime: data.Datetime,
              Status: "Closed",
              TotalAmount: data.TotalAmount,
              id: data.id,
              OrderDetails: data.OrderDetails,
              read: false
            })
            this.alertCtrl.create({
              header: 'Success',
              message: 'This order approved successfully',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel'
                }
              ]

            }).then(els2 => {
              els2.present()
            })
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]

    }).then(firstalert => {
      firstalert.present()


    })



  }
  cancelOrder(data) {
    this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.alertCtrl.create({
              header: 'Remarks',
              message: 'Please add a remarks why you want to cancel this order',
              inputs: [
                {
                  name: 'remarks',
                  placeholder: 'Add a remarks'
                }
              ],
              buttons: [
                {
                  text: 'Submit remarks',
                  handler: dataremarks => {


                    var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

                    //Update order to Cancelled
                    this.afstore.doc(`Orders/${data.id}`).update({
                      Status: 'Cancelled'
                    })


                    //User Notification Approved

                    var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "").split('0.00')[0]
                    var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
                    var confirmed = `Your order has been declined by the admin. ${items}. Total amount of ₱${totalAmount}`
                    this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
                      Message: confirmed,
                      Datetime: datetime,
                      read: false,
                      remarks: dataremarks.remarks
                    })

                    //History Saving
                    this.afstore.collection('History').add({
                      BillingAddress1: data.BillingAddress1,
                      BillingAddress2: data.BillingAddress2,
                      BillingFirstname: data.BillingFirstname,
                      BillingIndexId: data.BillingIndexId,
                      BillingLastname: data.BillingLastname,
                      BillingPhonenumber: data.BillingPhonenumber,
                      Billingemail: data.Billingemail,
                      Datetime: data.Datetime,
                      Status: "Cancelled",
                      TotalAmount: data.TotalAmount,
                      id: data.id,
                      OrderDetails: data.OrderDetails
                    })
                  }
                }
              ]
            }).then(el => {
              el.present()

              this.alertCtrl.create({
                header: 'Success',
                message: 'This order cancelled successfully',
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]

              }).then(els2 => {
                els2.present()
              })

            })
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(els3 => {
      els3.present()
    })




    // console.log("cancelled", data)
    // var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

    //  //Update order to Cancelled
    //  this.afstore.doc(`Orders/${data.id}`).update({
    //   Status: 'Cancelled'
    // })


    // //User Notification Approved

    // var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "").split('0.00')[0]
    // var items = data.OrderDetails.map(function (e) {return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}`}).join(', ')
    // var confirmed = `Your order has been declined by the admin. ${items}. Total amount of ₱${totalAmount}`
    // this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
    //   Message: confirmed,
    //   Datetime: datetime,
    //   read: false,
    //   remarks: "Your order has been confirmed"
    // })

    //  //History Saving
    //  this.afstore.collection('History').add({
    //   BillingAddress1: data.BillingAddress1,
    //   BillingAddress2: data.BillingAddress2,
    //   BillingFirstname: data.BillingFirstname,
    //   BillingIndexId: data.BillingIndexId,
    //   BillingLastname: data.BillingLastname,
    //   BillingPhonenumber: data.BillingPhonenumber,
    //   Billingemail: data.Billingemail,
    //   Datetime: data.Datetime,
    //   Status: "Cancelled",
    //   TotalAmount: data.TotalAmount,
    //   id: data.id,    
    //   OrderDetails: data.OrderDetails
    // })
  }
}
