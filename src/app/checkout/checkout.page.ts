import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  myInformation: any = {}
  paymentMethod: string = ''
  pendingorder: any
  constructor(private applicationRef: ApplicationRef,
    private zone: NgZone,
    private alertCtrl: AlertController, 
    private locationStrategy: LocationStrategy, 
    private router: Router, 
    //private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore, 
    private msg: MessengerService,
    private loadingController: LoadingController) 
    {
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //     this.meReference = afstore.doc(`users/${data.uid}`);
    //     this.sub = this.meReference.valueChanges().subscribe(async data => {
    //       this.myInformation = data
    //       this.pendingorder = this.myInformation.pendingorder
    //     })
        
    //   }
    // })
   }

  async ngOnInit() {
    this.msg.cartSubject.next(this.CartDetails())
    this.msg.cartSubject.next(this.loadCart())
  }
  CartDetails() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any)
    
       this.getCartDetails.map((i: any, index: any) => 
      {
        
        i.Materials.map((iMat: any, index: any) => 
        {
          iMat.Quantity = i.Quantity
          if (i.Category != "Slushee")
          {
            iMat.gramsperorder = i.ProductName.toLowerCase().includes('large') ? iMat.gramsperorderlarge : iMat.gramsperordermedium 
          }
          else 
          {
            iMat.gramsperorder = iMat.gramsperorder
          }
        })
      })
      //console.log("product Details", this.getCartDetails)
    }
  }
  inc(id: any, quantity: any) 
  {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {


        this.getCartDetails[i].Quantity = quantity + 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))

    this.loadCart()
  }
  dec(id: any, quantity: any) {

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
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any)

      this.total = this.getCartDetails.reduce((acc: any, val: any) => {
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

  singleDelete(data: any) 
  {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any) 
    
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
cartItemFunc() 
{
  var cartValue = JSON.parse(sessionStorage.getItem('cart') as any) 
    this.cartItem = cartValue.length
  this.msg.cartSubject.next(this.cartItem)

}
gotohome() {
  this.router.navigate(['tabs'])
}
async OrderNow() {
  this.CartDetails()
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
          }).then(async els => {
            if (!this.myInformation.FirstName || !this.myInformation.LastName
              || !this.myInformation.Address1 || 
              !this.myInformation.PhoneNumber) 
              {
                this.alertCtrl.create({
                  message: 'Please fill up about your details first.',
                  buttons: [
                    {
                      text: 'Ok',
                     handler: () => {
                      this.router.navigateByUrl('/tabs/tab3/edit')
                     } 
                    }
                  ]
                }).then(els2 => {
                  els2.present()
                 
                })
              } 
              else 
              {
                if (this.paymentMethod == '')
                {
                    var alertNoPaymentMethod = await this.alertCtrl.create({
                      message: 'Payment Method is required',
                      buttons: 
                      [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                    })
                    await alertNoPaymentMethod.present();
                }
                else 
                {
                  var notealert = await this.alertCtrl.create
                  ({
                    header: 'Write note for the admin, if none, just click order button',
                    backdropDismiss: false,
                    inputs: 
                    [
                      {
                        type: 'textarea',
                        label: 'note',
                        placeholder: 'Write your note here'
                      }
                    ],
                    buttons: 
                    [
                      {
                        text: 'Order',
                        handler: (notevalue) => 
                        {
                          els.present()
                      //     var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
                      // this.afstore.collection('Orders').add({
                      //   OrderDetails: this.getCartDetails,
                      //   BillingFirstname: this.myInformation.FirstName,
                      //   BillingLastname: this.myInformation.LastName,
                      //   BillingAddress1: this.myInformation.Address1,
                      //   BillingAddress2: this.myInformation.Address2,
                      //   BillingPhonenumber: this.myInformation.PhoneNumber,
                      //   Billingemail: this.myInformation.Email,
                      //   BillingIndexId: this.myInformation.Uid,
                      //   Status: 'Open',
                      //   Datetime: datetime,
                      //   TotalAmount: parseFloat(this.total.toString()).toFixed(2),
                      //   DatetimeToSort: new Date(),
                      //   Discount: 'None',
                      //   PaymentMethod: this.paymentMethod,
                      //   Note: notevalue[0] == '' ? 'NONE' : notevalue[0]
                      // }).then(el => {
                      //   this.meReference.update({
                      //     pendingorder: true
                      //   })
                      //   this.removeall()
                      //   this.paymentMethod = ''
                      //   this.meReference.update({
                      //     Address1: '',
                      //     Address2: ''
                      //   })
                      // }).catch(err => {
                      //   alert(err)
                      // })
                        }
                      },
                      {
                        text: 'Close',
                        role: 'cancel'
                      }
                    ]
                  })
                  await notealert.present();
                }
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