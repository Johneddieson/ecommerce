import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import * as _ from 'lodash'
import * as moment from 'moment';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-vieworderbyid',
  templateUrl: './vieworderbyid.page.html',
  styleUrls: ['./vieworderbyid.page.scss'],
})
export class VieworderbyidPage implements OnInit {
  public disabledSaveChanges: boolean = false
  @ViewChild(IonModal) modal: IonModal;
  public id;
  public orderReference: AngularFirestoreDocument
  public sub;
  public datetime: string = ''
  public fullname: string = ''
  public phonenumber: string = ''
  public email: string = ''
  public address: string = ''
  public payment: string = ''
  public note: string = ''
  public totalamount: string = ''
  public orderdetails : any[] = []
  public dataMaterials = []
  public specificProduct: string  = ''
  public billingindexid: string = ''
  public firstname: string = ''
  public lastname: string = ''
  public status: string = ''
  constructor(private actRoute: ActivatedRoute,
    private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController) 
  {
    this.retrieveDetails()  
  }

  retrieveDetails()
  {
    
    this.id = this.actRoute.snapshot.paramMap.get('id')
    
    this.orderReference = this.afstore.doc(`Orders/${this.id}`)
    this.sub = this.orderReference.valueChanges().subscribe(data => 
      {
        this.datetime = data.Datetime;
        this.fullname = `${data.BillingFirstname} ${data.BillingLastname}`
        this.phonenumber = data.BillingPhonenumber
        this.email = data.Billingemail
        this.address = data.BillingAddress1
        this.payment = data.PaymentMethod;
        this.note = data.Note
        this.totalamount = data.TotalAmount
        this.orderdetails = data.OrderDetails
        this.billingindexid = data.BillingIndexId
        this.firstname = data.BillingFirstname
        this.lastname = data.BillingLastname
        this.status = data.Status
      })
  }
  ngOnInit() {
  }

  getMaterialOfProducts(Data, ProductName)
      {

        if (this.status == "Open")
        {
          this.specificProduct = ''
          this.dataMaterials = []
          this.dataMaterials = Data
          this.specificProduct = ProductName
          this.modal.present(); 
     
        }
        else 
        {
          alert("This order is not pending anymore.")
        }
        
      }

      editMaterialQuantity(event, mat)
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
      var filterInvalid = flattenMaterialsArray.filter(f => isNaN(parseInt(f.Quantity)))
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
 this.updateMaterial()
  this.close()
}

updateMaterial()
    {
      this.afstore.doc(`Orders/${this.id}`).update
      ({
        OrderDetails: this.orderdetails
      }).then(async (success) => 
      {
        var successAlert = await this.alertCtrl.create
        ({
          message: 'Updated materials successfully!',
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
      }).catch((err) => 
      {
        //console.log("error updating quantity")
        alert(JSON.stringify(err))
      })
    }
close()
{
  this.modal.dismiss();
}

approveOrder() {
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
                handler: data => {
                  console.log(data);
                }
              }
            ],
            inputs: []
          };
      
      
          // // Now we add the radio buttons
          // for(let i=0; i< name.length; i++) {
          //   options.inputs.push({ name : 'options', value: name[i], label: name[i], type: 'radio' });
          // }
      
          // // Create the alert with the options
          // let alert = await this.alertCtrl.create(options);
          // alert.present();
          
            
          var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")

          //Update order to Approved
          this.afstore.doc(`Orders/${this.id}`).update({
            Status: 'Approved'
          })

          //User Notification Approved
          var totalAmount = this.currencyPipe.transform(this.totalamount, "", "")
          var items = this.orderdetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
          var confirmed = `Your order has been approved by the admin. ${items}. Total amount of ₱${totalAmount}`
          this.afstore.collection(`users/${this.billingindexid}/notifications`).add({
            Message: confirmed,
            Datetime: datetime,
            read: false,
            remarks: "Your order has been approved",
            DatetimeToSort: new Date(),
            OrderId: this.id
          })



          //History Saving
          this.afstore.collection('History').add({
            BillingAddress1: this.address,
            BillingAddress2: this.address,
            BillingFirstname: this.firstname,
            BillingIndexId: this.billingindexid,
            BillingLastname: this.lastname,
            BillingPhonenumber: this.phonenumber,
            Billingemail: this.email,
            Datetime: this.datetime,
            Status: "Approved",
            TotalAmount: this.totalamount,
            id: this.id,
            OrderDetails: this.orderdetails,
            read: false,
            DatetimeToSort: new Date(),
            Discount: 'None',
            PaymentMethod: this.payment,
            Note: this.note
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
        
        this.decreaseStock()
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
cancelOrder() {
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
              this.afstore.doc(`Orders/${this.id}`).update({
                Status: 'Rejected'
              })


              //User Notification Approved

              var totalAmount = this.currencyPipe.transform(this.totalamount, "", "")
              var items = this.orderdetails.map(function (e) { return `${e.ProductName}(${e.Quantity} pcs), Unit price of ₱${e.UnitPrice}` }).join(', ')
              var confirmed = `Your order has been rejected by the admin. ${items}. Total amount of ₱${totalAmount}`
              this.afstore.collection(`users/${this.billingindexid}/notifications`).add({
                Message: confirmed,
                Datetime: datetime,
                read: false,
                remarks: dataremarks.remarks,
                DatetimeToSort: new Date(),
                OrderId: this.id
              })

              //History Saving
              this.afstore.collection('History').add({
                BillingAddress1: this.address,
                BillingAddress2: this.address,
                BillingFirstname: this.firstname,
                BillingIndexId: this.billingindexid,
                BillingLastname: this.lastname,
                BillingPhonenumber: this.phonenumber,
                Billingemail: this.email,
                Datetime: this.datetime,
                Status: "Rejected",
                TotalAmount: this.totalamount,
                id: this.id,
                OrderDetails: this.orderdetails,
                DatetimeToSort: new Date(),
                Discount: 'None',
                PaymentMethod: this.payment    
              })

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
decreaseStock()
{
//this.getMaterials()
//var getmaterial = orders.map(function (e) {return e.Materials})
var getmaterial = this.orderdetails.map(function (e) {return e.Materials})
var ew = _.flatten(getmaterial)


ew.forEach(fe => 
{
  this.updateStocks(fe.itemId, fe.Quantity, fe.gramsperorder)
})
}
updateStocks(itemId, Quantity, gramsperorder)
{
//this.decreaseStocks()
var total = parseFloat(Quantity) * parseFloat(gramsperorder) 
this.afstore.doc(`Materials/${itemId}`).update({
Stock: firebase.default.firestore.FieldValue.increment(-total),
}).then(el => {
}).catch(err => {
//console.log("error edit stock", err)
})
}
}
