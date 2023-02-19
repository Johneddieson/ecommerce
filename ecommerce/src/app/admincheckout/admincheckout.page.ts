import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-admincheckout',
  templateUrl: './admincheckout.page.html',
  styleUrls: ['./admincheckout.page.scss'],
})
export class AdmincheckoutPage implements OnInit {

  getCartDetails: any = []
  getCurrentProductDetails: any = []
  total: number = 0;
  subtotal: number = 0;
  cartItem:number = 0
  getOrders: any = []
  meReference: AngularFirestoreDocument
  stockRefence: AngularFirestoreCollection
  sub
  myInformation: any = {}
  discount: string = 'None'
  paymentMethod: string = ''
  constructor(private alertCtrl: AlertController, private locationStrategy: LocationStrategy, private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore, private msg: MessengerService) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
      }
    })
   }

  ngOnInit() {
    this.msg.cartSubject.next(this.CartDetails())
    this.msg.cartSubject.next(this.loadCart())
    //this.CartDetails()
    //this.loadCart()
  
  }
  
  CartDetails() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
    }
  }
  inc(id, quantity) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {


        this.getCartDetails[i].Quantity = quantity + 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))

    this.loadCart()
  }
  dec(id, quantity) {

    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {

        if (quantity != 1)
          this.getCartDetails[i].Quantity = quantity - 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
    this.loadCart()
  }
  loadCart() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))

      this.total = this.getCartDetails.reduce((acc, val) => {
        return acc + (val.UnitPrice * val.Quantity)
      }, 0)

      
    }
  }


  removeall() {
     
    sessionStorage.removeItem('cart')
    
      
    this.getCartDetails = []
    this.total = 0
      this.cartItem = 0
    this.msg.cartSubject.next(this.cartItem)
    this.loadCart()
    
    
  }

  singleDelete(data) {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart')) 
    
      for (let i=0; i<this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id === data.id) {
          this.getCartDetails.splice(i, 1);
          sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
         
          this.loadCart()
          this.cartItemFunc()
        }
      }
    }
}
cartItemFunc() {
  var cartValue = JSON.parse(sessionStorage.getItem('cart')) 
    this.cartItem = cartValue.length
  this.msg.cartSubject.next(this.cartItem)

}
gotohome() {
  this.router.navigate(['tabs'])
}
async OrderNow() {
 this.CartDetails()
 let length = this.getCartDetails.length > 1 ? "orders" : "order"
 let orderid = ""

    if (this.paymentMethod == '')
    {
      var alertPaymentMethodRequired = await this.alertCtrl.create
      ({
        message: 'Payment Method is required',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      })
      await alertPaymentMethodRequired.present()
    }
    else
    {
      this.alertCtrl.create({
        message: 'Are you sure you want to approve this order?',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              
              this.alertCtrl.create({
                header: 'Customer Name',
                inputs: [
                  {
                    name: 'Name',
                    placeholder: 'Customer Name',
                    type: 'text'
                  }
                ],
                buttons: [
                  {
                    text: 'Ok',
                    handler: (data) => {
                  if (!data.Name || data.Name == undefined) {
                    alert("Name of customer is required")
                  }  else if (data.Name.length < 2) {
                    alert("Name of customer should be two characters minimum")
                  } else {
     
                  
                      this.alertCtrl.create({
                message:  `${data.Name} ${length} has been approved!`,
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel'
                  }
                ]
              }).then(els => {
               
                    els.present()
                    //Orders Saving Walk In
                    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
                this.afstore.collection('Orders').add({
                  OrderDetails: this.getCartDetails,
                  BillingFirstname: data.Name,
                  BillingLastname: "Walk-In",
                  BillingAddress1: "Walk-In",
                  BillingAddress2: "Walk-In",
                  BillingPhonenumber: "Walk-In",
                  Billingemail: "Walk-In",
                  BillingIndexId: "",
                  Status: 'Approved',
                  Datetime: datetime,
                  TotalAmount: parseFloat(this.total.toString()).toFixed(2),
                  DatetimeToSort: new Date(),
                  Discount: this.discount,
                  PaymentMethod: this.paymentMethod
                }).then(el => {
                  orderid = el.id
                }).catch(err => {
                })
                
                
     
                //Decreasing Stocks
                this.getCartDetails.forEach(fe => {
                  this.afstore.doc(`Products/${fe.id}`).update({
                    Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity * fe.GramsPerOrder)
                  })
                })
               //Inventory Saving
     
               this.getCartDetails.forEach(async fe => {
                await this.afstore.collection('Inventory').add({
                  Datetime: datetime,
                  Category: fe.Category,
                  ProductName: fe.ProductName,
                  Quantity: parseInt(fe.GramsPerOrder) * -1,
                  ImageUrl: fe.ImageUrl,
                  DatetimeToSort: new Date(),
                  ProductId: fe.id,
                  Destination: data.Name
                })
              })
     
              //History Saving
              this.afstore.collection('History').add({
                BillingAddress1: "Walk-In",
                BillingAddress2: "Walk-In",
                BillingFirstname: data.Name,
                BillingIndexId: "",
                BillingLastname: "Walk-In",
                BillingPhonenumber: "Walk-In",
                Billingemail: "Walk-In",
                Datetime: datetime,
                Status: "Approved",
                TotalAmount: parseFloat(this.total.toString()).toFixed(2),
                id: orderid,
                OrderDetails: this.getCartDetails,
                read: false,
                DatetimeToSort: new Date(),
                Discount: this.discount,
                PaymentMethod: this.paymentMethod
              })
              this.removeall()
              this.discount = 'None'
              this.paymentMethod = ''
              })
                    }
                  }
                  },
                  {
                    text: 'Cancel',
                    handler: (data) => {
     
                    }
                  }
                ]
              }).then(El => {
                El.present()
              })
     
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

async selectDiscount()
{
  var discountAlert = await this.alertCtrl.create({
    header: 'Select discount category',
    inputs: 
    [
      {
        type: 'radio',
        label: 'None',
        name: 'None',
        value: 'None'
      },
      {
        type: 'radio',
        label: 'PWD less 30',
        name: 'PWD less 30',
        value: 'PWD less 30'
      },
      {
        type: 'radio',
        label: 'Senior Citizen less 50',
        name: 'Senior Citizen less 50',
        value: 'Senior Citizen less 50'
      }
    ],
    buttons: 
    [
      {
        text: 'Select',
        handler: (data) => 
        {
          if (data == 'Senior Citizen less 50')
            {
              this.discount = ''
              this.loadCart()
              this.total = this.total - 50
              this.discount = data
            }
            else if (data == 'PWD less 30')
            {
              this.discount = ''
              this.loadCart()
              this.total = this.total - 30
              this.discount = data      
            }
            else 
            {
              this.discount = ''
              this.loadCart()
              this.discount = data
            }
        }
      },
      {
        text: 'Close',
        role: 'cancel'
      }
    ]
  })
  await discountAlert.present();
}
async selectPaymentMethod()
{
  var alertForPaymentMethod = await this.alertCtrl.create({
    header: 'Select Payment Method',
    inputs: [
      {
        type: 'radio',
        name: 'G-Cash',
        value: 'G-Cash',
        label: 'G-Cash'
      },
      {
        type: 'radio',
        name: 'Cash',
        value: 'Cash',
        label: 'Cash'
      },
    ],
    buttons: 
    [
      {
        text: 'Select',
        handler: (data) => {
            if (data == 'G-Cash')
            {
              this.paymentMethod = ''
              this.paymentMethod = data
            }
            else 
            {
              this.paymentMethod = ''
              this.paymentMethod = data
              
            }
        }
      },
      {
        text: 'Close',
        role: 'cancel'
      }
    ]
  })
  await alertForPaymentMethod.present()
}
}
