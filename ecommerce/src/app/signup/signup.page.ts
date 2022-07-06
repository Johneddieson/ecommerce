import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
email: any;
password: any;
firstname: any;
lastname: any
address1: any
address2: any
phonenumber: any
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router) { }
  gotosignin() {
      this.navCtrl.navigateForward('login')
    }
    SignUp() {
      
      this.auth.SignUp(this.email, this.password).then(res => {
  this.loadingCtrl.create({
  message: 'Registering User...',
 
}).then(el => {
  el.present()
  res.user.updateProfile({
    displayName: 'customer'
  })  

sessionStorage.setItem('user', JSON.stringify(res.user))

this.afstore.doc(`users/${res.user.uid}`).set({
  Email: this.email == undefined ? "" : this.email,
  Uid: res.user.uid,
  FirstName: this.firstname == undefined ? "" : this.firstname,
  LastName: this.lastname == undefined ? "" : this.lastname,
  Address1: this.address1 == undefined ? "" : this.address1,
  Address2: this.address2 == undefined ? "" : this.address2,
  PhoneNumber: this.phonenumber== undefined ? "" : this.phonenumber
}).then(suc => {

}).catch(err => {
  console.log("err", err)
})

setTimeout(() => {
  el.dismiss()
  this.email = ''
  this.password = ''
  this.firstname= ''
  this.lastname= ''
  this.address1= ''
  this.address2= ''
  this.phonenumber= ''
  this.router.navigateByUrl('/tabs')
}, 3000)

})

}).catch(err => {
  this.loadingCtrl.create({
    message: 'Registering User...',
  }).then(el => {
    el.present()
  setTimeout(() => {
    el.dismiss()
    this.alertCtrl.create({
      message: err.message,
      
    }).then(el => {
      el.present()
    })

  }, 3000)
  })
})      
    }
  ngOnInit() {
  }

}
