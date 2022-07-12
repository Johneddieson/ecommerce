import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.page.html',
  styleUrls: ['./viewproducts.page.scss'],
})
export class ViewproductsPage implements OnInit {
  productReference: AngularFirestoreCollection
  sub
  products: any[] = []
  constructor(public http: HttpClient,  public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router) {
   
      this.afauth.authState.subscribe(data => {
        if (data && data.uid) {
            this.productReference = this.afstore.collection('Products');
            this.sub = this.productReference.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))
            ).subscribe(data => {
                this.products = data
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
          handler: () => {
            var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
        
            this.afstore.collection('Inventory').add({
              Quantity: parseInt(data.Stock) * -1,
              Datetime: datetime,
              read: false,
              Destination: "Admin",
              ProductName: data.ProductName,
              UnitPrice: data.UnitPrice,
              ImageUrl: data.ImageUrl
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

}
