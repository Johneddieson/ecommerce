import { LocationStrategy } from '@angular/common';
import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbserviceService } from '../services/dbservice.service';
import { PaymongoService } from '../services/paymongo.service';
import * as _ from 'lodash';
import {  increment } from '@angular/fire/firestore';
declare var google: any;
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
  private geocoder: any;
  myaddress: any;
  firstname: any;
  lastname: any;
  phonenumber: any;
  email: any;
  uid: any;
  constructor(private applicationRef: ApplicationRef,
    private zone: NgZone,
    private alertCtrl: AlertController, 
    private locationStrategy: LocationStrategy, 
    private router: Router, 
    private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore, 
    private msg: MessengerService,
    private loadingController: LoadingController,
    private httpClient: HttpClient,
    private dbservice: DbserviceService,
    private paymongoservice: PaymongoService
    ) 
    {
    this.afauth.authState.subscribe(data => {
      this.email = data?.email;
        this.uid = data?.uid;
        this.dbservice.getDataById('users', data?.uid).subscribe((data) => 
        {
          this.myaddress = data.Address1;
          this.firstname = data.FirstName;
          this.lastname = data.LastName;
          this.phonenumber = data.PhoneNumber;

        })
    })
   }
   currentlat(): void
   {
    this.msg.getCurrentLocation()
    .then((coords: any) => console.log("the coords", coords))
    .catch((error: any) => console.log(error));
   }
   loadUserInfo()
   {
    this.httpClient.get('https://ipapi.co/json/')
    .subscribe((dataip: any) => 
    {
      //console.log("ip", dataip);
      // this.msg.myLoc(dataip.latitude, dataip.longitude).subscribe(async data  => 
      //   {
      //     var myaddress = data.Response.View[0].Result[0].Location.Address
      //     var myaddress2 = data.Response.View[0].Result[1].Location.Address
      //       var address1 = `${myaddress.Label}`
      //        var address2 = `${myaddress2.Label}`
      //        console.log("address 1", address1)
      //        console.log("address 2", address2)
      //     })
      this.getAddress(dataip.latitude, dataip.longitude)
    })
   }
getlocation()
{
  this.msg.myLoc(14.5635423, 121.0908218).subscribe(async data  =>
    {
      var myaddress = data.Response.View[0].Result[0].Location.Address
      var myaddress2 = data.Response.View[0].Result[1].Location.Address
        var address1 = `${myaddress.Label}`
         var address2 = `${myaddress2.Label}`
         console.log("address 1", data.Response.View[0].Result[1])
         console.log("address 2", data.Response.View[0].Result[0])
         
      })
}
getAddress(latitude: any, longitude: any) {
  this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
    if (status === 'OK') {
      if (results[0]) {
        //this.zoom = 12;
        //this.address = results[0].formatted_address;
        console.log("address", results[0].formatted_address)
      } else {
        console.log('No results found');
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  
  });
}
  async ngOnInit() {
    //this.geocoder = new google.maps.Geocoder;
   // this.loadUserInfo()
    //this.currentlat()
    //this.getlocation()
    this.msg.cartSubject.next(this.CartDetails())
    this.msg.cartSubject.next(this.loadCart())
  }
  CartDetails() {
    if (sessionStorage.getItem('cart')) {

      //console.log("product Details", this.getCartDetails)
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any)
    }

    
  //   this.getCartDetails.map((i: any, index: any) => 
  //  {
     
  //    i.Materials.map((iMat: any, index: any) => 
  //    {
  //      iMat.Quantity = i.Quantity
  //      if (i.Category != "Slushee")
  //      {
  //        iMat.gramsperorder = i.ProductName.toLowerCase().includes('large') ? iMat.gramsperorderlarge : iMat.gramsperordermedium 
  //      }
  //      else 
  //      {
  //        iMat.gramsperorder = iMat.gramsperorder
  //      }
  //    })
  //  })
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
refreshMaterials()
{
  this.getCartDetails.map((i: any, index: any) => 
  {
    
    i.Materials.map((iMat: any, index: any) => 
    {
     // iMat.Quantity = i.Quantity
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
        name: 'Online Payment',
        value: 'Online Payment',
        label: 'Online Payment'
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
            if (data == 'Online Payment')
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

async OrderAutoApprove()
{
  if (this.paymentMethod == '')
  {
   
    var nopaymentmethod = await this.alertCtrl.create
    ({
      message: 'Please select a payment method, click on the upper right icon to select',
      backdropDismiss: false,
      buttons: 
      [
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    })
    await nopaymentmethod.present();
  }
  else 
  {
    if (!this.myaddress || !this.firstname || !this.lastname || !this.phonenumber)
    {
      var alertNoInformation = await this.alertCtrl.create
      ({
        message: 'Please fill up some of your details first',
        backdropDismiss: false,
        buttons: 
        [
          {
            text: 'Ok',
            handler: () => 
            {
              this.router.navigateByUrl('/userinformation')
            }
          }
        ]
      })
      await alertNoInformation.present();
    }
    else 
    {
    this.refreshMaterials()
    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")

    if (this.paymentMethod != 'Cash')
    {
      var descriptionofCreatingPaymentLink = this.getCartDetails.map(function (e: any) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
       var descriptionfinal = `${this.firstname} ${this.lastname} : ${descriptionofCreatingPaymentLink}. Total amount of ₱${this.total}`
       var totalForAPIPayment = parseInt(this.total + "00")
        if (this.total < 100)
        {
          var minimumifgcashalert = await this.alertCtrl.create
          ({
            message: 'You chosen online payment, It should be 100 pesos minimum order.',
            backdropDismiss: false,
            buttons: 
            [
              {
                text: 'Close',
                role: 'cancel'
              }
            ]
          })
          await minimumifgcashalert.present();
        }
        else 
        {
       this.paymongoservice.createPaymentLink(totalForAPIPayment, descriptionfinal, '')
       .subscribe((data) => 
       {
          
      const specificdataForOrderCollection = 
      {
        OrderDetails: this.getCartDetails,
        BillingFirstname: this.firstname,
        BillingLastname: this.lastname,
        BillingAddress1: this.myaddress,
        BillingAddress2: '',
        BillingPhonenumber: this.phonenumber,
        Billingemail: this.email,
        BillingIndexId: this.uid,
        Status: 'Approved',
        Datetime: datetime,
        TotalAmount: parseFloat(this.total.toString()).toFixed(2),
        DatetimeToSort: new Date(),
        Discount: "None",
        PaymentMethod: this.paymentMethod,
        Note: '',
        paymentReference: data.data.attributes.reference_number
      };
      this.dbservice.postData('Orders', specificdataForOrderCollection);
       })
       this.successorderalert()
      }
    }
    else 
    {
      const specificdataForOrderCollectionForCash = 
      {
        OrderDetails: this.getCartDetails,
        BillingFirstname: this.firstname,
        BillingLastname: this.lastname,
        BillingAddress1: this.myaddress,
        BillingAddress2: '',
        BillingPhonenumber: this.phonenumber,
        Billingemail: this.email,
        BillingIndexId: this.uid,
        Status: 'Approved',
        Datetime: datetime,
        TotalAmount: parseFloat(this.total.toString()).toFixed(2),
        DatetimeToSort: new Date(),
        Discount: "None",
        PaymentMethod: this.paymentMethod,
        Note: '',
        paymentReference: 'COD'
 
      };
      this.dbservice.postData('Orders', specificdataForOrderCollectionForCash);
      this.successorderalert()
    }

  }
}
}

editQuantity(event: any, datamaterials: any)
{
  var value = event.target.value
  datamaterials.Quantity = parseInt(value)
  this.refreshMaterials();
}
decreaseStock()
{
var getmaterial = this.getCartDetails.map(function (e: any) {return e.Materials})
var ew = _.flatten(getmaterial)

ew.forEach((fe: any) => 
{
  this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
})
}
updateStocks(itemId: any, Quantity: any, gramsperorder: any)
{
//this.decreaseStocks()

 var total = parseFloat(Quantity) * parseFloat(gramsperorder)

var specificData = 
{
  Stock: increment(-total),
};

  this.dbservice
  .updateData(itemId, specificData, 'Materials')
  .then((success) => {})
  .catch((err) => {});

  // this.afstore.doc(`Materials/${itemId}`).update({
// Stock: firebase.default.firestore.FieldValue.increment(-total),
// }).then(el => {
// }).catch(err => {
// })
}
async successorderalert()
{
  //this.decreaseStock();
  var successAlert = await this.alertCtrl.create
  ({
    message: 'Your order has been approved. If we noticed that your personal information something wrong or your phone number is cannot be reached, we will automatically cancel your order.',
    backdropDismiss: false,
    buttons: 
    [
      {
        text: 'Close',
        role: 'cancel'
      }
    ]
  })
  await successAlert.present();
  
  setTimeout(() => {
    this.removeall()
    this.paymentMethod = ''
  }, 4000);
}
}
