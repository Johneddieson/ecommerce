import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-admintab3',
  templateUrl: './admintab3.page.html',
  styleUrls: ['./admintab3.page.scss'],
})
export class Admintab3Page implements OnInit {
  inventoryReference: AngularFirestoreCollection
  sub;
inventoryList: any[] = []
  constructor(private afauth: AngularFireAuth,
    private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(data => {
        if (data && data.uid) {
          this.inventoryReference = this.afstore.collection('Inventory')
          this.sub = this.inventoryReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
              console.log("inventory", data)
              data = data.map((i, index) => {
                return Object.assign({
                  id: i.id,
                  Datetime: i.Datetime,
                  DatetimeToSort: moment(i.Datetime).toDate(),  
                  Destination: i.Destination,
                  ImageUrl: i.ImageUrl,
                  read: i.read,
                  Quantity: i.Quantity,
                  UnitPrice: i.UnitPrice,
                  ProductName: i.ProductName,

                })
              })
              data = data.sort((a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
              this.inventoryList = data
          })
        }
      })
     }

  ngOnInit() {
  }

}
