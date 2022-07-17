import { LocationStrategy } from '@angular/common';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import { map } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  getCartDetails: any = []
  total: number = 0;
  cartItem:number = 0
  getOrders: any = []
  meReference: AngularFirestoreDocument
  sub
  myInformation: any = {}
  constructor(private alertCtrl: AlertController, private locationStrategy: LocationStrategy, private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore, private msg: MessengerService) {

    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.meReference = afstore.doc(`users/${data.uid}`);
        this.sub = this.meReference.valueChanges().subscribe(data => {
          this.myInformation = data


          this.afstore.collection('Orders').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))
          ).subscribe(data2 => {
           
            this.getOrders = data2
            console.log("orders", this.getOrders)
            var dashboard = this.getOrders 
            dashboard = dashboard.map((i, index) => {
              console.log("orders", i)
              return Object.assign({}, i, {
                
              })
         
            })
            // data2.forEach(fe => {
            //   this.getOrders = fe.OrderDetails
            // console.log("orders", this.getOrders)
            // })
          })
        })
      }
    })
   }

  ngOnInit() {
    this.CartDetails()
    this.loadCart()
  }
  CartDetails() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
      console.log("the cart", this.getCartDetails)
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
OrderNow() {
  this.alertCtrl.create({
    message: 'Are you sure you want to finalize your order?',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          
          this.alertCtrl.create({
            message: 'Ordered Successfully!',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          }).then(els => {
            console.log("my info", this.myInformation)
            if (!this.myInformation.FirstName || !this.myInformation.LastName
              || !this.myInformation.Address1 || !this.myInformation.Address2 || 
              !this.myInformation.PhoneNumber) {
                this.alertCtrl.create({
                  message: 'Oops! There are some of your information that is not identified, Please Edit before we proceed',
                  buttons: [
                    {
                      text: 'Ok',
                     handler: () => {
                      this.router.navigateByUrl('/tabs/tab3')
                     } 
                    }
                  ]
                }).then(els2 => {
                  els2.present()
                })
              } else {
                els.present()
                var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
            this.afstore.collection('Orders').add({
              OrderDetails: this.getCartDetails,
              BillingFirstname: this.myInformation.FirstName,
              BillingLastname: this.myInformation.LastName,
              BillingAddress1: this.myInformation.Address1,
              BillingAddress2: this.myInformation.Address2,
              BillingPhonenumber: this.myInformation.PhoneNumber,
              Billingemail: this.myInformation.Email,
              BillingIndexId: this.myInformation.Uid,
              Status: 'Open',
              Datetime: datetime,
              TotalAmount: parseFloat(this.total.toString()).toFixed(2),
              DatetimeToSort: new Date()
            }).then(el => {
            }).catch(err => {
            })
            this.removeall()
            
          }
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
