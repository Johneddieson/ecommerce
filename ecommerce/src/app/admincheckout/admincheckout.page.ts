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
  cartItem:number = 0
  getOrders: any = []
  meReference: AngularFirestoreDocument
  stockRefence: AngularFirestoreCollection
  sub
  myInformation: any = {}
  constructor(private alertCtrl: AlertController, private locationStrategy: LocationStrategy, private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore, private msg: MessengerService) {

    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.stockRefence =   this.afstore.collection('Products')
        this.stockRefence.snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            })))
            .subscribe(Data => {
            //sessionStorage.setItem('CurrentProducts', JSON.stringify(Data))
    
            this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
          
            const mergeById = (array1, array2) =>
            array1.map(itm => ({
                ...Object.assign({}, itm, {
                 Stock: array2.find((item) => (item.id === itm.id) && item).Stock,
                 Category: itm.Category,
                 ImageUrl: itm.ImageUrl,
                 ProductName: itm.ProductName,
                 Quantity: itm.Quantity,
                 //Stock: 11,
                 UnitPrice: itm.UnitPrice,
                 id: itm.id
               })
            }));
       
       
           // const mergeById = (array1, array2) => {
           //  // console.log("array1", array1)
           //  // console.log("array2", array2)
       
           // }
            var results = mergeById(this.getCartDetails, Data)
            sessionStorage.removeItem('cart')
            this.getCartDetails = sessionStorage.setItem('cart', JSON.stringify(results))
           this.CartDetails()

           
          })
    

        this.meReference = afstore.doc(`users/${data.uid}`);
        this.sub = this.meReference.valueChanges().subscribe(data => {
          this.myInformation = data

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
      //  this.getCurrentProductDetails = JSON.parse(sessionStorage.getItem('CurrentProducts'))
   
    //  const mergeById = (array1, array2) =>
    //  array1.map(itm => ({
    //      ...Object.assign({}, itm, {
    //       CurrentStock: array2.find((item) => (item.id === itm.id) && item).Stock,
    //       Category: itm.Category,
    //       ImageUrl: itm.ImageUrl,
    //       ProductName: itm.ProductName,
    //       Quantity: itm.Quantity,
    //       Stock: itm.Stock,
    //       UnitPrice: itm.UnitPrice,
    //       id: itm.id
    //     })
    //  }));


    // // const mergeById = (array1, array2) => {
    // //  // console.log("array1", array1)
    // //  // console.log("array2", array2)

    // // }
    //  var results = mergeById(this.getCartDetails, this.getCurrentProductDetails)
    //  console.log("dambel", results)
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
 this.CartDetails()
 
 var stockvalidation = this.getCartDetails.filter(f => f.Quantity > f.Stock)
 
 if (stockvalidation.length > 0) {
            //ResultModal.show("error", "Saving Delivery Failed", `This title(s) does not fit the remaining stock in the order: \n  ${outofstock.map(function (e) { return e.Itemcode }).join('\n')}`);
            //  alert(`error ${outofstock[index].Itemcode}`)
         //   alert(`This title(s) does not fit the remaining stock in the order: \n  ${outofstock.map(function (e) { return e.Itemcode }).join('\n')}`);
         //   hideLoader('.salesOrderDetails');
        //    enableSaveButton()
        alert(`Insufficient Stock: \n  ${stockvalidation.map(function (e) { return `${e.ProductName} > ${e.Stock} current stock \n` }).join('\n')}`); 
      }
       else
      {
        this.CartDetails()
        var stockvalidations = this.getCartDetails.filter(f => f.Quantity > f.Stock)
        if (stockvalidations.length > 0) {
          alert(`Insufficient Stock: \n  ${stockvalidations.map(function (e) { return e.ProductName }).join('\n')}`); 
  
        } else {
          
        
  let length = this.getCartDetails.length > 1 ? "orders" : "order"
  let orderid = ""



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
                  //console.log("hahaha", data.Name)
              if (!data.Name || data.Name == undefined) {
                alert("Name of customer is required")
              }  else if (data.Name.length < 4) {
                alert("Name of customer should be four characters minimum")
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
                var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
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
              DatetimeToSort: new Date()
            }).then(el => {
              orderid = el.id
            }).catch(err => {
            })
            
            

            //Decreasing Stocks
            this.getCartDetails.forEach(fe => {
              //console.log("order details", fe)
              this.afstore.doc(`Products/${fe.id}`).update({
                Stock: firebase.default.firestore.FieldValue.increment(-fe.Quantity)
              })
            })
           //Inventory Saving

           this.getCartDetails.forEach(fe => {
            this.afstore.collection('Inventory').add({
              Quantity: parseInt(fe.Quantity) * -1,
              Datetime: datetime,
              read: false,
              Destination: data.Name,
              ProductName: fe.ProductName,
              UnitPrice: fe.UnitPrice,
              ImageUrl: fe.ImageUrl,
              DatetimeToSort: new Date()
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
            Status: "Closed",
            TotalAmount: parseFloat(this.total.toString()).toFixed(2),
            id: orderid,
            OrderDetails: this.getCartDetails,
            read: false,
            DatetimeToSort: new Date()
          })
          this.removeall()
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
}
}
