import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admintab3',
  templateUrl: './admintab3.page.html',
  styleUrls: ['./admintab3.page.scss'],
})
export class Admintab3Page implements OnInit {
inventoryList: any[] = []
inventoryList2: any[] = []
  constructor(
    //private afauth: AngularFireAuth,
    //private afstore: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router) 
    {
      // this.afauth.authState.subscribe(data => {
      //   if (data && data.uid) {
      //   }
      // })
     }
    async ProductName(id: string) 
    {
      // return  await this.afstore.doc(`Products/${id}`).get().toPromise()
      // .then(snapshot => {
      //   return this.getProductName(snapshot.data() as any)
      // })
    }
    getProductName(data: any) {
      return data.ProductName
    }

  ngOnInit() {
    this.queryProducts('')
  }
  addproduct() {
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
  async queryProducts(parameter: any)
  {
    // this.inventoryReference = this.afstore.collection('Products')
    // this.sub = this.inventoryReference.snapshotChanges()
    // .pipe(map(actions => actions.map(a => {
    //   return {
    //     id: a.payload.doc.id,
    //     ...a.payload.doc.data() as any
    //   }
    // }))).subscribe( data => {  
    //     data = data.sort(function(a, b) {
    //       if (a.ProductName < b.ProductName) {
    //         return -1
    //       }
    //       if (a.ProductName > b.ProductName) {
    //         return 1
    //       }
    //       return 0
    //     })
    //     if (parameter == '')
    //     {
    //       data = data
    //     }
    //     else 
    //     {
    //       data = data.filter(f => f.Category == parameter);
    //     }
    //     this.inventoryList = data
        
    //   })
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