import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-customerfeedback',
  templateUrl: './customerfeedback.page.html',
  styleUrls: ['./customerfeedback.page.scss'],
})
export class CustomerfeedbackPage implements OnInit {

feedbackLength: number = 0
feedBacksData: any[] = []
numberofnotread: number = 0
customersfeedback: any[] = []
  constructor(
    //private afstore: AngularFirestore, 
    private afauth: AngularFireAuth,
    private router: Router,
    //private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController,
    private dbservice: DbserviceService
    ) 
    {
      this.afauth.authState.subscribe((user) => 
      {
        if (user && user.uid)
        {
              this.dbservice.getData('Feedbacks').subscribe((data) => 
              {
               data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
               this.numberofnotread = data.length;
               this.customersfeedback = data;
               
              })
        }
      })
        // this.afauth.authState.subscribe(data => {
        //   if (data && data.uid)
        //   {
        //     this.feedBackCollection = this.afstore.collection('FeedBacks')

        // this.sub = this.feedBackCollection.snapshotChanges()
        // .pipe(map(actions => actions.map(a => {
        //   return {
        //     id: a.payload.doc.id,
        //     ...a.payload.doc.data() as any
        //   }
        // })))
        // .subscribe(data => {
        //   data = data.sort((a, b) => Number(b.DateTimeToSort) - Number(a.DateTimeToSort))
        //     this.feedBacksData = data
        // })
        //   }
        // })
    }

  ngOnInit() {
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

  async markAsRead(data: any)
  {
    var obj = 
    {
      read: true
    }
    this.dbservice.updateData(data.id, obj, 'Feedbacks').then(() => {}).catch(() => {})
  }

}
