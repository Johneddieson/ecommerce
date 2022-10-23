import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { first, last } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  getCartDetails: any = []
meReference: AngularFirestoreDocument
sub
firstname;
lastname;
address1;
address2;
phonenumber;
isDisabled = false;
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router) {
    this.afauth.authState.subscribe(data => {
      if (data && data.uid) {
        this.meReference = this.afstore.doc(`users/${data.uid}`)
        this.sub = this.meReference.valueChanges().subscribe(data => {
            console.log("my information", data)
            this.firstname = data.FirstName
            this.lastname = data.LastName
            if ((!this.firstname || this.firstname == undefined) && (!this.lastname || this.lastname == undefined)) {
              this.isDisabled = !this.isDisabled
            } else {
              this.isDisabled = this.isDisabled
            }
            this.address1 = data.Address1
            this.address2 = data.Address2
            this.phonenumber = `${data.PhoneNumber}`
        })
      }
    })
  }

  Edit() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log("get cart", this.getCartDetails)
    this.loadingCtrl.create({
      message: 'Editing Please Wait...'
    }).then(loading => {
      loading.present()
      this.alertCtrl.create({
        message: 'You edited your information successfully',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      }).then(alert => {

     setTimeout(() => {
      loading.dismiss()
      alert.present()
      this.meReference.update({
        FirstName: this.firstname,
        LastName: this.lastname,
        Address1: this.address1,
        Address2: this.address2,
        PhoneNumber: this.phonenumber
      })
      if (this.getCartDetails.length != 0) {
        this.router.navigateByUrl('/checkout')
      }
     }, 3000)
      }).catch(alerterr => {

      })
     
    }).catch(loadingerr => {

    })
  
  }
}
