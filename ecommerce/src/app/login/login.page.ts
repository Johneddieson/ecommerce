import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
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
  ishide = false;
  continueAsCustomer
  isthisadmin = false
  constructor(private navCtrl: NavController,private auth: AuthServiceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone
    ) {}

  ngOnInit() {
 
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
            var thesession = JSON.parse(sessionStorage.getItem('user'))
            if (thesession != null) {
              this.ishide = true
              if (thesession.displayName == "customer") {
                this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
                this.isthisadmin = false

              } else {
                this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
                this.isthisadmin = true

              }
            } else {
              this.ishide = false
            }
           
        }, 0)
      })
    })
  }
  ResetPassword() {
this.alertCtrl.create({
  header: 'Reset Password',
  inputs: [
    {
      name: 'Email',
      placeholder: 'Please type your email',
      type: 'email'
    }
  ],
  buttons: [
    {
      text: 'Ok',
      handler: (data) => {
        console.log("hahaha", data)
        this.auth.ForgotPassword(data.Email)
        .then(success => {
          this.alertCtrl.create({
            header: 'Success',
            message: 'The reset password code has been sent to your email'
          }).then(els => {
            els.present()
          })
        }).catch(error => {
          this.alertCtrl.create({
            header: 'Error',
            message: "Email not found"
          }).then(els2 => {
            els2.present()
          })
        })
      }
    }
  ]
}).then(El => {
  El.present()
})

   
  }
  
  navigateadmin() {
    this.router.navigateByUrl('adminpage')
  }
  navigatecustomer() {
    this.router.navigateByUrl('tabs')
  }
  gotosignup() {
    this.navCtrl.navigateForward('signup');
  }
  // LogIn(email, password) {
  //   this.auth.SignIn(email.value, password.value).then((res => {
      
        
  //       if (res.user.displayName == "admin") {
  //       this.router.navigateByUrl('adminpage')
        
  //     } else {
  //       this.router.navigateByUrl('tabs')
  //     }
        
     
  //     sessionStorage.setItem('user', JSON.stringify(res.user));
  //  this.Email1 = ''
  //  this.Password1 = ''
  //   })).catch(err => {
      
      
  //       this.alertCtrl.create({
  //         message: err.message
  //       }).then(el => {
  //         el.present()
  //       })
  //   })
  // }
  LogIn()
    {
        this.auth.SignIn(this.Email1, this.Password1)
        .then(async (success) => 
        {
            if (success.user.emailVerified == false)
            {
                var alertController = await this.alertCtrl.create
                ({
                  message: `Your email is not yet verified, Please verify it to your email box
                  before proceeding.`,
                  buttons: 
                  [
                    // {
                    //   text: 'Yes',
                    //   handler: async () => 
                    //   {
                    //     var alertSent = await this.alertCtrl.create
                    //     ({
                    //       message: 'Email verification has been sent to your email, Please verify it first so you can proceed.',
                    //       buttons: [
                    //         {
                    //           text: 'Ok',                              
                    //           role:'cancel'
                    //         }
                    //       ]
                    //     })
                    //     await alertSent.present();
                    //     this.afauth.signOut();
                    //     success.user.sendEmailVerification();
                    //   }
                    // },
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
                })
                await alertController.present();
            }
            else 
            {
              var successLoading = await this.loadingCtrl.create
              ({
                message: 'Logging in...',
                spinner: 'lines-sharp'
              })   
              await successLoading.present();

              setTimeout(async () => {
                await successLoading.dismiss();
                if (success.user.displayName == 'admin')
                {
                  this.router.navigateByUrl('adminpage')
                }
                else 
                {
                  this.router.navigateByUrl('home')
                }
                sessionStorage.setItem('user', JSON.stringify(success.user));
                
                //email = '';
                //password = ''
                this.Email1 = ''
                this.Password1 = ''
              }, 3000);
            }
        })
        .catch(async err => 
          {
              var alertError = await this.alertCtrl.create
              ({
                message: err.message,
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await alertError.present();
          })      
    }

}
