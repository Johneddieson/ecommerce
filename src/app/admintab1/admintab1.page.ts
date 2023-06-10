import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, IonAccordionGroup, IonModal } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import * as _ from 'lodash'
import { DbserviceService } from '../services/dbservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';
@Component({
  selector: 'app-admintab1',
  templateUrl: './admintab1.page.html',
  styleUrls: ['./admintab1.page.scss'],
})
export class Admintab1Page implements OnInit {
  @ViewChild(IonAccordionGroup) accordionGroup!: IonAccordionGroup;

  allPendingOrders: any[] = []
  currentStock: any[] = []
  public dataMaterials: any[] = []
comments: string = ''
public disabledSaveChanges: boolean = false
@ViewChild(IonModal) modal!: IonModal;
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
          this.dbservice.getData('Orders')
          .subscribe((dataorders) => 
          {
                    dataorders = dataorders.sort((a: any, b: any) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
                    dataorders = dataorders.filter(f => f.Status == "Approved");
                    dataorders.map((i: any, index: any) => 
                    {
                      if (i.PaymentMethod != 'Cash')
                      {
                        setInterval(() => 
                        {
                          this.paymongoservice.retrievePaymentLink(i.paymentReference).subscribe((data) => 
                        {
                          i.paymentStatus = data.data.attributes.status
                        })
                        }, 500)
                      }
                      else 
                      {
                        i.paymentStatus = 'unpaid'
                      }
                    })
                    this.allPendingOrders = dataorders
                    //console.log("wew", this.allPendingOrders)
          })
        }
      })
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //     this.productReference = this.afstore.collection('Orders', ref => ref.where("Status", "==", "Open"))

    //     this.sub = this.productReference.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => {
    //         return {
    //           id: a.payload.doc.id,
    //           ...a.payload.doc.data() as any
    //         }
    //       }))).subscribe(data => {
    //         console.log("orders", data)  
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


    //        this.allPendingOrders = data
    //       })
    //   }
    // })
  }

  ngOnInit() {
  }
  morecategories() {
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

  closeAccordion() {
    this.accordionGroup.value = ''
    
  }
  toggleSection() {
    this.accordionGroup.value = 'frameworks'
  }
  
  approveOrder(data: any) {
        this.alertCtrl.create({
          header: 'Question',
          message: 'Are you sure you want to approve this order?',
          buttons: [
            {
              text: 'Yes',
              handler: async () => {
                var name = [ 'john', 'dixy', 'tom', 'jared']; 

                var options = {
                  title: 'Choose the name',
                  message: 'Which name do you like?',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Ok',
                      // handler: data as any => {
                      //   console.log(data);
                      // }
                      handler: (data: any) => 
                      {
                        console.log(data);
                      }
                    }
                  ],
                  inputs: []
                };
            
            
                // Now we add the radio buttons
                // for(let i=0; i< name.length; i++) {
                //   options.inputs.push({ name : 'options', value: name[i], label: name[i], type: 'radio' });
                // }
            
                // Create the alert with the options
                let alert = await this.alertCtrl.create(options);
                alert.present();
                
                  
              //   var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
    
              //   //Update order to Approved
              //   this.afstore.doc(`Orders/${data.id}`).update({
              //     Status: 'Approved'
              //   })
    
              //   //User Notification Approved
              //   var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
              //   var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
              //   var confirmed = `Your order has been approved by the admin. ${items}. Total amount of ₱${totalAmount}`
              //   this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
              //     Message: confirmed,
              //     Datetime: datetime,
              //     read: false,
              //     remarks: "Your order has been approved",
              //     DatetimeToSort: new Date(),
              //     OrderId: data.id
              //   })
    
    
    
              //   //History Saving
              //   this.afstore.collection('History').add({
              //     BillingAddress1: data.BillingAddress1,
              //     BillingAddress2: data.BillingAddress2,
              //     BillingFirstname: data.BillingFirstname,
              //     BillingIndexId: data.BillingIndexId,
              //     BillingLastname: data.BillingLastname,
              //     BillingPhonenumber: data.BillingPhonenumber,
              //     Billingemail: data.Billingemail,
              //     Datetime: data.Datetime,
              //     Status: "Approved",
              //     TotalAmount: data.TotalAmount,
              //     id: data.id,
              //     OrderDetails: data.OrderDetails,
              //     read: false,
              //     DatetimeToSort: new Date(),
              //     Discount: 'None',
              //     PaymentMethod: data.PaymentMethod
              //   })
              //   this.alertCtrl.create({
              //     header: 'Success',
              //     message: 'This order approved successfully',
              //     buttons: [
              //       {
              //         text: 'Ok',
              //         role: 'cancel'
              //       }
              //     ]
    
              //   }).then(els2 => {
              //     els2.present()
              //   })   
              
              // this.decreaseStock(data.OrderDetails)
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
  cancelOrder(data: any) {
    this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to reject this order?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.alertCtrl.create({
              header: 'Remarks',
              message: 'Please add a remarks why you want to reject this order',
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


                    var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")

                    //Update order to Rejected
                    // this.afstore.doc(`Orders/${data.id}`).update({
                    //   Status: 'Rejected'
                    // })


                    //User Notification Approved

                    // var totalAmount = this.currencyPipe.transform(data.TotalAmount, "", "")
                    // var items = data.OrderDetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
                    // var confirmed = `Your order has been rejected by the admin. ${items}. Total amount of ₱${totalAmount}`
                    // this.afstore.collection(`users/${data.BillingIndexId}/notifications`).add({
                    //   Message: confirmed,
                    //   Datetime: datetime,
                    //   read: false,
                    //   remarks: dataremarks.remarks,
                    //   DatetimeToSort: new Date(),
                    //   OrderId: data.id
                    // })

                    //History Saving
                    // this.afstore.collection('History').add({
                    //   BillingAddress1: data.BillingAddress1,
                    //   BillingAddress2: data.BillingAddress2,
                    //   BillingFirstname: data.BillingFirstname,
                    //   BillingIndexId: data.BillingIndexId,
                    //   BillingLastname: data.BillingLastname,
                    //   BillingPhonenumber: data.BillingPhonenumber,
                    //   Billingemail: data.Billingemail,
                    //   Datetime: data.Datetime,
                    //   Status: "Rejected",
                    //   TotalAmount: data.TotalAmount,
                    //   id: data.id,
                    //   OrderDetails: data.OrderDetails,
                    //   DatetimeToSort: new Date(),
                    //   Discount: 'None',
                    //   PaymentMethod: data.PaymentMethod    
                    // })

                    this.alertCtrl.create({
                      header: 'Success',
                      message: 'This order rejected successfully',
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
                }
              ]
            }).then(el => {
              el.present()

             

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

  }
  decreaseStock(orders: any)
{
  //this.getMaterials()
  var getmaterial = orders.map(function (e: any) {return e.Materials})
       
  var ew = _.flatten(getmaterial)

 
  //  ew.forEach(fe => 
  //   {
  //       this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
  //   })
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
  //   Stock: firebase.default.firestore.FieldValue.increment(-total),
  // }).then(el => {
  // }).catch(err => {
  // })
}

getMaterialOfProducts(Data: any)
      {
        
        
          this.dataMaterials = []
          this.dataMaterials = Data
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
      var mapMaterials = this.dataMaterials.map(function(e: any) {return e.Materials})
    var flattenMaterialsArray =  _.flatten(mapMaterials)
      var filterInvalid = flattenMaterialsArray.filter(f => isNaN(f.Quantity))
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
//this.updateMaterial()
  this.close()
}
close()
{
  this.modal.dismiss();
}
// updateMaterial()
//     {
//       this.afstore.doc(`Orders/${this.id}`).update
//       ({
//         OrderDetails: this.orders
//       }).then(async (success) => 
//       {
//         var successAlert = await this.alertCtrl.create
//         ({
//           message: 'Updated materials successfully!',
//           backdropDismiss: false,
//           buttons: 
//           [
//             {
//               text: 'Close',
//               role: 'cancel'
//             }
//           ]
//         })
//         await successAlert.present();
//       }).catch((err) => 
//       {
//         //console.log("error updating quantity")
//         alert(JSON.stringify(err))
//       })
//     }

url(id: any)
{
  var url = `${window.location.origin}/vieworderbyid/${id}`
  window.open(url, '_blank');
}
async delivered(data: any)
{
  if(data.PaymentMethod != 'Cash' && data.paymentStatus == 'unpaid')
  {
    var cantDeliverAlert = await this.alertCtrl.create
    ({
      message: `Please wait until <b>${data.BillingFirstname} ${data.BillingLastname}</b>'s order is paid before marking it as delivered.`,
      backdropDismiss: false,
      buttons: 
      [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    })
    await cantDeliverAlert.present();
  } 
  else 
  {
    var markAsDelivered = 
    {
      Status: "Delivered"
    }
      this.dbservice.postData('History', data)
      .then(async (success) => 
      {
        var deliveredAlert = await this.alertCtrl.create
        ({
          message: `<b>${data.BillingFirstname} ${data.BillingLastname}</b>'s order has been delivered`,
          backdropDismiss: false,
          buttons: 
          [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await deliveredAlert.present();
        this.dbservice.updateData(data.id, markAsDelivered, 'Orders')
        .then((success) => 
        {
        }).catch((err) => 
         {
         })
      }).catch((err) => 
      {
        alert(JSON.stringify(err))
      })
  }
}

deleteOrder(data: any)
{
  if (data.PaymentMethod != 'Cash')
  {
    this.paymongoservice.retrievePaymentLink(data.paymentReference).subscribe((data) => 
    {
      this.paymongoservice.archivePaymentLink(data.data.id).subscribe((data) => {})
    })
  }

  this.dbservice.deleteData(data.id, 'Orders').then(async (el) => 
    {
        var orderDelete = await this.alertCtrl.create
        ({
          message: 'Order deleted',
          backdropDismiss: false,
          buttons: 
          [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        })
        await orderDelete.present();
    })
    .catch((err) => {
      
    })
}

}
