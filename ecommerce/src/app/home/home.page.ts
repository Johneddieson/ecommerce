import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { MessengerService } from '../messenger.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numbers = 0;
showLog = false
productReference: AngularFirestoreCollection
sub
productList: any[] = []
getCartDetails: any = []
cartItem:number = 0
  constructor(private msg: MessengerService, private alertCtrl: AlertController, private auth: AuthServiceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth) {

    this.afauth.authState.subscribe(user => {

      if (user && user.uid) {
       this.productReference =  afstore.collection('Products')
       this.sub = this.productReference.snapshotChanges().pipe(map(actions => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data() as any
        }
       }))).subscribe(data => {
        this.productList = data
       })   
      }
    })
   }

  ngOnInit() {
this.loadCart()
  }
loadCart() {
  if (localStorage.getItem('cart') != null) {
var thearray = []
    thearray.push(JSON.parse(localStorage.getItem('cart')))
    this.numbers = thearray.length;
  } 
}
  Increase(data) {
    data.Quantity +=1
  this.loadCart()
  }
  Decrease(data) {
    if (data.Quantity == 1) {
      this.alertCtrl.create({
        message: 'Quantity should not be zero',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      }).then(el => {
        el.present()
        this.loadCart()
      })
    } else {
      data.Quantity -= 1
this.loadCart()
    }
  }
  alertNgam() {
  }
  itemsCart: any = []
  AddtoCart(data) {
    var cartData = localStorage.getItem('cart')
    if (cartData == null) {
      let storageDataGet: any = []
      storageDataGet.push(data)
      localStorage.setItem('cart', JSON.stringify(storageDataGet))

    } else {
      var id = data.id
      let index: number = -1

      this.itemsCart = JSON.parse(localStorage.getItem('cart'))
      for (let i= 0; i<this.itemsCart.length; i++) {
        if (id == this.itemsCart[i].id) {
          this.itemsCart[i].Quantity = data.Quantity
          index = i;
          break;
        }
      }
    
      if (index == -1) {
          this.itemsCart.push(data)
          
        localStorage.setItem('cart', JSON.stringify(this.itemsCart))
      } else {
        localStorage.setItem('cart', JSON.stringify(this.itemsCart))
      }
    this.cartItemFunc()
   
    }
    this.loadCart()
  }
  cartItemFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cart')) 
      this.cartItem = cartValue.length
    this.msg.cartSubject.next(this.cartItem)
  
  }
}
