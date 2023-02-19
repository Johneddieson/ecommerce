import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admintab3',
  templateUrl: './admintab3.page.html',
  styleUrls: ['./admintab3.page.scss'],
})
export class Admintab3Page implements OnInit {
  inventoryReference: AngularFirestoreCollection
  productReference : AngularFirestoreDocument
  sub;
  sub2;
  productname;
inventoryList: any[] = []
inventoryList2: any[] = []
productObject 
  constructor(private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router) {
      this.afauth.authState.subscribe(data => {
        if (data && data.uid) {
        }
      })
     }
    async ProductName(id: string) {
      return  await this.afstore.doc(`Products/${id}`).get().toPromise()
      .then(snapshot => {
        return this.getProductName(snapshot.data() as any)
      })
    }
    getProductName(data) {
      return data.ProductName
    }

  ngOnInit() {
    this.queryProducts('')
  }
  addproduct() {
    this.alertCtrl.create({
      header: 'Choose',
      inputs: [
        {
          type: 'radio',
          label: 'POS',
          value: 'POS'

        },
        {
          type: 'radio',
          label: 'View Products',
          value: 'View Products'

        },
        {
          type: 'radio',
          label: 'Add Product',
          value: 'Add Product'

        },
        // {
        //   type: 'radio',
        //   label: 'Edit Information',
        //   value: 'Edit Information'

        // },
       
      ],
      buttons: [
        {
          text: 'Go',
          handler: data => {
            console.log("data", data)
            if (data == "View Products") {
              this.router.navigateByUrl('/viewproducts')  
            } else if (data == "Add Product") {

              this.router.navigateByUrl('/add-product')
            } else if (data == "POS") {
              this.router.navigateByUrl('/createpos')
            }
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
  async queryProducts(parameter)
  {
    this.inventoryReference = this.afstore.collection('Products')
    this.sub = this.inventoryReference.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))).subscribe( data => {  
        data = data.sort(function(a, b) {
          if (a.ProductName < b.ProductName) {
            return -1
          }
          if (a.ProductName > b.ProductName) {
            return 1
          }
          return 0
        })
        if (parameter == '')
        {
          data = data
        }
        else 
        {
          data = data.filter(f => f.Category == parameter);
        }
        this.inventoryList = data
        
      })
  }

  async SearchCategory()
  {
    var alertCtrl = await this.alertCtrl.create({
      header: 'Search Category',
      inputs: [
        {
          type: 'radio',
          label: '--SHOW ALL--',
          value: ''
        },
        {
          type: 'radio',
          label: 'Milktea',
          value: 'Milktea'
        },
        {
          type: 'radio',
          label: 'Fruit tea',
          value: 'Fruit tea'
        },
        {
          type: 'radio',
          label: 'Slushee',
          value: 'Slushee'
        },
      ],
      buttons: [
        {
          text: 'Search',
          handler: (data) => {
            // alert(data)
            this.queryProducts(data)
          }
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    }) 
  
    await alertCtrl.present();
  }
}
