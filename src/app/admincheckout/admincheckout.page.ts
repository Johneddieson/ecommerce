import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import * as _ from 'lodash';
import { DbserviceService } from '../services/dbservice.service';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, 
  increment, addDoc,
getDoc, docData } from '@angular/fire/firestore';
import { PaymongoService } from '../services/paymongo.service';
import { SendemailapiService } from '../services/sendemailapi/sendemailapi.service';
import { Sendemail } from '../interface/sendemail';
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
  sendemailModal!: Sendemail;
  @ViewChild(IonModal) modal!: IonModal;
  public disabledSaveChanges: boolean = false
  constructor(private alertCtrl: AlertController, 
    private locationStrategy: LocationStrategy, 
    private router: Router, 
    //private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore,
    private dbservice: DbserviceService, 
    private msg: MessengerService,
    private paymongoservice: PaymongoService,
    private sendemailservice: SendemailapiService
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
      if (this.paymentMethod != 'Cash' && this.total < 100)
      {
        var alertlessthanonehundred = await this.alertCtrl.create
        ({
            message: 'The total order should be 100 pesos minimum.',
            backdropDismiss: false,
            buttons: 
            [
              {
                text: 'Close',
                role: 'cancel'
              }
            ]
        })
        await alertlessthanonehundred.present();
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
                inputs: this.paymentMethod != 'Cash' ? [
                  {
                    name: 'Name',
                    placeholder: 'Customer Name',
                    type: 'text',
                    
                  },
                  {
                    name: 'Email',
                    placeholder: 'Email',
                    type: 'email',
                  },
                  
                ] : [
                  {
                    name: 'Name',
                    placeholder: 'Customer Name',
                    type: 'text',
                    
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

                    var commentAlertController = await this.alertCtrl.create
                    ({
                      header: 'Write Customer note. If none, just click order button',
                      inputs: 
                      [
                        {
                          type: 'textarea',
                          label: 'Note',
                          placeholder: 'Write some customer note here...'
                        }
                      ],
                      buttons: 
                      [
                        {
                          text: 'Order',
                          handler: (note) => 
                          {
                              
                      this.alertCtrl.create({
                message:  `${data.Name} ${length} has been approved!`,
                buttons: [
                  {
                    text: 'Ok',
                    handler: (datawew: any) => 
                    {
                                            //Orders Saving Walk In
                    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")                      
                          //Paymongo Create Link
                          this.createAPIPaymentLink(
                            data.Name,
                            datetime,
                            orderid,
                            note[0],
                            data.Email
                          );
                          //End of Paymongo Create Link
        
                  //Decreasing Stocks
                   this.decreaseStock()
                  //End of Decreasing Stocks
                  
                            setTimeout(() => {
                              this.removeall()
                              this.discount = 'None'
                              this.paymentMethod = ''
                            }, 3000);
                
                    }
                  }
                ]
              }).then(els => 
                {
               
                    els.present()
              })
                          }
                        },
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]  
                    })
                      await commentAlertController.present();
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
        label: 'PWD less 20',
        name: 'PWD less 20',
        value: 'PWD less 20'
      },
      {
        type: 'radio',
        label: 'Senior Citizen less 20',
        name: 'Senior Citizen less 20',
        value: 'Senior Citizen less 20'
      }
    ],
    buttons: 
    [
      {
        text: 'Select',
        handler: (data) => 
        {
          if (data == 'Senior Citizen less 20')
            {
              this.discount = ''
              this.loadCart()
              var discountpercent = (this.total * 20) / 100
              this.total = this.total - discountpercent
              this.discount = data
            }
            else if (data == 'PWD less 20')
            {
              this.discount = ''
              this.loadCart()
              var discountpercent = (this.total * 20) / 100
              this.total = this.total - discountpercent
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

decreaseStock()
{
//this.getMaterials()
//var getmaterial = orders.map(function (e) {return e.Materials})
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

  createAPIPaymentLink(Name: any, datetime: any, orderid: any, note: any, email: any)
  {
    var descriptionofCreatingPaymentLink = this.getCartDetails.map(function (e: any) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
       var descriptionfinal = `${Name} WALK-IN : ${descriptionofCreatingPaymentLink}. Total amount of ₱${this.total}`
       var totalForAPIPayment = parseInt(this.total + "00")
       //console.log("the payment", this.paymentMethod)
       if (this.paymentMethod != 'Cash') {
         this.paymongoservice
           .createPaymentLink(totalForAPIPayment, descriptionfinal, note)
           .subscribe((data) => {
             //Sending Email Service
             this.sendemailModal = {
               to: email,
               subject: `Hi! ${Name}, here is your payment link`,
               html: ` <a href="https://pm.link/Dmixologist/${data.data.attributes.reference_number}" target='_blank' style='background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;'>Pay now!</a>`,
               text: ` <a href="https://pm.link/Dmixologist/${data.data.attributes.reference_number}" target='_blank' style='background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;'>Pay now!</a>`,
             };
             this.sendemailservice
               .sendEmailApi(this.sendemailModal)
               .subscribe(() => {});
           
           
         //Orders Saving Walk In
         var specificdataForOrderCollection = {
          OrderDetails: this.getCartDetails,
          BillingFirstname: Name,
          BillingLastname: 'Walk-In',
          BillingAddress1: 'Walk-In',
          BillingAddress2: 'Walk-In',
          BillingPhonenumber: 'Walk-In',
          Billingemail: 'Walk-In',
          BillingIndexId: '',
          Status: 'Preparing',
          Datetime: datetime,
          TotalAmount: parseFloat(this.total.toString()).toFixed(2),
          DatetimeToSort: new Date(),
          Discount: 'None',
          PaymentMethod: this.paymentMethod,
          Note: note,
          paymentReference: data.data.attributes.reference_number,
          Type: 'POS',
        };
        this.dbservice.postData('Orders', specificdataForOrderCollection).then(() => {})
           
           
              });
       } 
       else 
       {
         //Orders Saving Walk In
         var specificdataForOrderCollection = {
           OrderDetails: this.getCartDetails,
           BillingFirstname: Name,
           BillingLastname: 'Walk-In',
           BillingAddress1: 'Walk-In',
           BillingAddress2: 'Walk-In',
           BillingPhonenumber: 'Walk-In',
           Billingemail: 'Walk-In',
           BillingIndexId: '',
           Status: 'Preparing',
           Datetime: datetime,
           TotalAmount: parseFloat(this.total.toString()).toFixed(2),
           DatetimeToSort: new Date(),
           Discount: 'None',
           PaymentMethod: this.paymentMethod,
           Note: note,
           paymentReference: '',
           Type: 'POS',
         };
         this.dbservice.postData('Orders', specificdataForOrderCollection).then(() => {})
       }
     
  }
}
