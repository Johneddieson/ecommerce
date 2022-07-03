import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Email1: any;
  Password1: any;
  sessionStorage;
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router) {
  
      if (this.auth.isLoggedIn) {
        this.router.navigateByUrl('/home')
       } else {
         this.router.navigateByUrl('/login')
         
       }
    }

  ngOnInit() {
    // setInterval(() => {

    // }, 100)
  }
  LogIn(email, password) {
    this.auth.SignIn(email.value, password.value).then((res => {
      console.log("user", res)
      this.loadingCtrl.create({
        message: 'Logging In...'
      }).then(el => {
        el.present();
        setTimeout(() => {
          el.dismiss()
          this.router.navigateByUrl('home')
        }, 3000)
      })

      sessionStorage.setItem('user', JSON.stringify(res.user));
   this.Email1 = ''
   this.Password1 = ''
    })).catch(err => {
      this.loadingCtrl.create({
        message: 'Logging In...'
      }).then(el => {
        el.present();
        setTimeout(() => {
          el.dismiss()
          this.alertCtrl.create({
            message: err.message
          }).then(el => {
            el.present()
          })
        }, 3000)
      })
      
    })
  }

  gotosignup() {
    this.navCtrl.navigateForward('signup');
  }
}
