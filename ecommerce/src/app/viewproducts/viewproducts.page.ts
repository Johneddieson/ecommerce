import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.page.html',
  styleUrls: ['./viewproducts.page.scss'],
})
export class ViewproductsPage implements OnInit {
  productReference: AngularFirestoreCollection
  sub
  products: any[] = []
  @Input() title: string;
  public id: string
  dropdown = false;
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private actRoute: ActivatedRoute) {

    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        // this.productReference = this.afstore.collection('Products');
        // this.sub = this.productReference.snapshotChanges().pipe(
        //   map(actions => actions.map(a => {
        //     return {
        //       id: a.payload.doc.id,
        //       ...a.payload.doc.data() as any
        //     }
        //   }))
        // ).subscribe(data => {
        //     this.products = data
        // })

        this.actRoute.queryParams.subscribe(params => {
          if (params.category == undefined) {
            this.productReference = this.afstore.collection('Products')
          } else {
            this.productReference = this.afstore.collection('Products', ref => ref.where("Category", "==", params.category))

          }
          this.sub = this.productReference.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))
          ).subscribe(data => {
            data = data.filter(f => f.Stock > 0)
          data = data.sort(function(a, b) {
            if (a.ProductName < b.ProductName) {
              return -1
            }
            if (a.ProductName > b.ProductName) {
              return 1
            }
            return 0
          })
            this.products = data
          })
        })
      }
    })
  }

  ngOnInit() {
  }
  DeleteProduct(data) {
    this.alertCtrl.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

            // this.afstore.collection('Inventory').add({
            //   Quantity: parseInt(data.Stock) * -1,
            //   Datetime: datetime,
            //   read: false,
            //   Destination: "Admin",
            //   ProductName: data.ProductName,
            //   UnitPrice: data.UnitPrice,
            //   ImageUrl: data.ImageUrl
            // })
            await this.afstore.collection('Inventory').add({
              Datetime: datetime,
              Category: data.Category,
              ProductName: data.ProductName,
              Quantity: parseInt(data.Stock) * -1,
              ImageUrl: data.ImageUrl,
              DatetimeToSort: new Date(),
              ProductId: data.id,
              Destination: 'Admin'
            })
            this.afstore.doc(`Products/${data.id}`).delete()
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })

  }

  EditProduct(data) {
    this.router.navigateByUrl(`/editproduct/${data.id}`)

  }
  hideDropdown(event) {
    const xTouch = (event.clientX)
    const yTouch = (event.clientY)

    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top + 2
    const leftBoundary = rec.left + 2
    const rightBoundary = rec.right - 2

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false
    }

  }
 async clickProducts(dataProducts) 
  {
    var alertCtrl = await this.alertCtrl.create({
    header: 'Choose what you want to do to this product',
    inputs: [
      {
        type: 'radio',
        name: 'Edit',
        value: 'Edit',
        label: 'Edit',
      },
      {
        type: 'radio',
        name: 'Delete',
        value: 'Delete',
        label: 'Delete'
      },
    ],
    buttons: [
      {
        text: 'Go',
        handler: (data) => {
          if (data == 'Edit')
          {

            this.EditProduct(dataProducts)
          }
          else
          {
            this.DeleteProduct(dataProducts)
          }
        }
      },
      {
        text: 'Close',
        role: 'Cancel'
      }
    ]      
    })
    await alertCtrl.present()
  }
}
