import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customerfeedback',
  templateUrl: './customerfeedback.page.html',
  styleUrls: ['./customerfeedback.page.scss'],
})
export class CustomerfeedbackPage implements OnInit {

  feedBackCollection: AngularFirestoreCollection
sub
feedbackLength: number = 0
feedBacksData: any[] = []
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private alertCtrl: AlertController) 
    {
        this.afauth.authState.subscribe(data => {
          if (data && data.uid)
          {
            this.feedBackCollection = this.afstore.collection('FeedBacks')

        this.sub = this.feedBackCollection.snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        })))
        .subscribe(data => {
          data = data.sort((a, b) => Number(b.DateTimeToSort) - Number(a.DateTimeToSort))
            this.feedBacksData = data
        })
          }
        })

    }

  ngOnInit() {
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
        {
          type: 'radio',
          label: 'Inventory',
          value: 'Inventory'

        },
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
            else if (data == "Inventory")
            {
              this.router.navigateByUrl('/inventory')
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

  async markAsRead(data)
  {
      await this.afstore.doc(`FeedBacks/${data.id}`)
      .update({
        Read: true
      })
  }

}
