import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private unsubscriber : Subject<void> = new Subject<void>();
  Email1: any;
  Password1: any;
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    ) {
  
        // this.afauth.authState.subscribe(data => {
        //   if (data && data.uid) {
        //     router.navigateByUrl('/tabs')
        //   }
        // })
    }

  ngOnInit() {
 
    
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
          this.router.navigateByUrl('tabs')
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
