import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import * as _ from 'lodash';
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
  //sub
  myInformation: any = {}
  discount: string = 'None'
  paymentMethod: string = ''
  public specificProduct: string  = ''
  public dataMaterials: any[] = []
  @ViewChild(IonModal) modal!: IonModal;
  public disabledSaveChanges: boolean = false
  constructor(private alertCtrl: AlertController, 
    private locationStrategy: LocationStrategy, 
    private router: Router, 
    //private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore, 
    private msg: MessengerService
    ) 
    {
    // this.msg.cartSubject.next(this.CartDetails())
    // this.msg.cartSubject.next(this.loadCart())
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //   }
    // })
   }

  ngOnInit() {
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
      this.getCartDetails = sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
      //console.log("product Details", this.getCartDetails)
    }
  }
  inc(id: any, quantity: any) {
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

  singleDelete(data: any) {
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
cartItemFunc() {
  var cartValue = JSON.parse(sessionStorage.getItem('cart') as any) 
    this.cartItem = cartValue.length
  this.msg.cartSubject.next(this.cartItem)

}
gotohome() {
  this.router.navigate(['tabs'])
}
async OrderNow() {
 //this.CartDetails()
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
                    handler: async (data) => {
                  if (!data.Name || data.Name == undefined) 
                  {
                    alert("Name of customer is required")
                  }  
                  else if (data.Name.length < 2) 
                  {
                    alert("Name of customer should be two characters minimum")
                  } 
                  else 
                  {

              //       var commentAlertController = await this.alertCtrl.create
              //       ({
              //         header: 'Write Customer note. If none, just click order button',
              //         inputs: 
              //         [
              //           {
              //             type: 'textarea',
              //             label: 'Note',
              //             placeholder: 'Write some customer note here...'
              //           }
              //         ],
              //         buttons: 
              //         [
              //           {
              //             text: 'Order',
              //             handler: (note) => 
              //             {
                              
              //         this.alertCtrl.create({
              //   message:  `${data.Name} ${length} has been approved!`,
              //   buttons: [
              //     {
              //       text: 'Ok',
              //       role: 'cancel'
              //     }
              //   ]
              // }).then(els => {
               
              //       els.present()
              //       //Orders Saving Walk In
              //       var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
              //   this.afstore.collection('Orders').add({
              //     OrderDetails: this.getCartDetails,
              //     BillingFirstname: data.Name,
              //     BillingLastname: "Walk-In",
              //     BillingAddress1: "Walk-In",
              //     BillingAddress2: "Walk-In",
              //     BillingPhonenumber: "Walk-In",
              //     Billingemail: "Walk-In",
              //     BillingIndexId: "",
              //     Status: 'Approved',
              //     Datetime: datetime,
              //     TotalAmount: parseFloat(this.total.toString()).toFixed(2),
              //     DatetimeToSort: new Date(),
              //     Discount: this.discount,
              //     PaymentMethod: this.paymentMethod,
              //     Note: note[0]
              //   }).then(el => {
              //     orderid = el.id
              //   }).catch(err => {
              //   })
                           
     

              // //History Saving
              // this.afstore.collection('History').add({
              //   BillingAddress1: "Walk-In",
              //   BillingAddress2: "Walk-In",
              //   BillingFirstname: data.Name,
              //   BillingIndexId: "",
              //   BillingLastname: "Walk-In",
              //   BillingPhonenumber: "Walk-In",
              //   Billingemail: "Walk-In",
              //   Datetime: datetime,
              //   Status: "Approved",
              //   TotalAmount: parseFloat(this.total.toString()).toFixed(2),
              //   id: orderid,
              //   OrderDetails: this.getCartDetails,
              //   read: false,
              //   DatetimeToSort: new Date(),
              //   Discount: this.discount,
              //   PaymentMethod: this.paymentMethod,
              //   Note: note[0]
              // })
              
              //     //Decreasing Stocks
              //     this.decreaseStock()
              // this.removeall()
              // this.discount = 'None'
              // this.paymentMethod = ''
              // })
              //             }
              //           },
              //           {
              //             text: 'Close',
              //             role: 'cancel'
              //           }
              //         ]  
              //       })
              //         await commentAlertController.present();
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

decreaseStock()
{
//this.getMaterials()
//var getmaterial = orders.map(function (e) {return e.Materials})
var getmaterial = this.getCartDetails.map(function (e: any) {return e.Materials})
var ew = _.flatten(getmaterial)


// ew.forEach(fe => 
// {
//   this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
// })
ew.forEach((fe: any) => 
{
  this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
})
}
updateStocks(itemId: any, Quantity: any, gramsperorder: any)
{
//this.decreaseStocks()
// var total = parseFloat(Quantity) * parseFloat(gramsperorder) 
// this.afstore.doc(`Materials/${itemId}`).update({
// Stock: firebase.default.firestore.FieldValue.increment(-total),
// }).then(el => {
// }).catch(err => {
// })

}

getMaterialOfProducts(Data: any, ProductName: any)
      {
        //this.CartDetails()

          this.specificProduct = ''
          this.dataMaterials = []
          this.dataMaterials = Data
          this.specificProduct = ProductName
          this.modal.present(); 
      }

      editMaterialQuantity(event: any, mat: any)
      {
        var value = event.target.value
        mat.Quantity = parseInt(value)
        this.condimentsQuantityValidation()
      }
      condimentsQuantityValidation()
      {
        //var mapMaterials = this.dataMaterials.map(function(e) {return e.Materials})
        var mapMaterials = this.dataMaterials
        var flattenMaterialsArray =  _.flatten(mapMaterials)
        //var filterInvalid = flattenMaterialsArray.filter(f => isNaN(parseInt(f.Quantity)))
        var filterInvalid = flattenMaterialsArray.filter((f: any) => isNaN(parseInt(f.Quantity)))
        if (filterInvalid.length > 0)
        {
          this.disabledSaveChanges = true
        }
        else 
        {
          this.disabledSaveChanges = false
        }
      }
  async saveQuantityChanged()
  {
    this.close()
    //console.log("final order", this.getCartDetails)
  }
  close()
  {
    this.modal.dismiss();
  }
}
