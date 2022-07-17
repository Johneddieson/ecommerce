import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
productCollection: AngularFirestoreCollection
sub
products: any[] = []
public category: string
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore,
    private actRoute: ActivatedRoute) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
       
        this.actRoute.queryParams.subscribe(params => {
          
        if (params.category == undefined) {
          this.productCollection = this.afstore.collection('Products')
          
        } else  {
          this.productCollection = this.afstore.collection('Products', ref => ref.where("Category", "==", params.category))
            
        }
          this.sub = this.productCollection.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
             this.products = data
          })
        })
      }
    })
   }

  ngOnInit() {
  }

}
