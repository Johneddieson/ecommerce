import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DbserviceService } from '../services/dbservice.service';
import { catchError, pipe, throwError, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Email1: any;
  Password1: any;
  ishide = false;
  continueAsCustomer: any
  isthisadmin = false
  mainpage: string = ''
  constructor(private navCtrl: NavController,
    //private auth: AuthServiceService, 
    //private afstore: AngularFirestore,
    //private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, 
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private dbservice: DbserviceService,
    ) 
    {}

  ngOnInit() 
  {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
            var thesession = JSON.parse(sessionStorage.getItem('user') as any)
            if (thesession != null) {
              this.ishide = true
              // if (thesession.displayName == "customer") {
              //   this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
              //   this.isthisadmin = false
              //   this.mainpage = `${thesession.displayName.toUpperCase()}`

              // } else if (thesession.displayName == 'admin') {
              //   this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`
              //   this.isthisadmin = true
              //   this.mainpage = `${thesession.displayName.toUpperCase()}`  
              // }
              // else 
              // {
              //     this.mainpage = `${thesession.displayName.toUpperCase()}`
              // }
              this.mainpage = `${thesession.displayName.toUpperCase()}`
            } 
            else {
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
        // this.auth.ForgotPassword(data.Email)
        // .then(success => {
        //   this.alertCtrl.create({
        //     header: 'Success',
        //     message: 'The reset password code has been sent to your email'
        //   }).then(els => {
        //     els.present()
        //   })
        // }).catch(error => {
        //   this.alertCtrl.create({
        //     header: 'Error',
        //     message: "Email not found"
        //   }).then(els2 => {
        //     els2.present()
        //   })
        // })
      }
    }
  ]
}).then(El => {
  El.present()
})

   
  }
  navigateadmin() {
    this.router.navigateByUrl('/adminpage/atab1')
  }
  navigatecustomer() {
    this.router.navigateByUrl('tabs')
  }
  gotosignup() {
    this.navCtrl.navigateForward('signup');
  }
  LogIn()
    {
    //   this.auth.signInWithEmailAndPassword
    //   (
    //     this.Email1,
    //     this.Password1
    //   )
    // ).pipe
    // (
    //   catchError
    //   (
    //     (error: FirebaseError) => 
    //   throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
    //   )

        // this.auth.SignIn(this.Email1, this.Password1)
        // .then(async (success) => 
        // {
        //     if (success.user.emailVerified == false)
        //     {
        //         var alertController = await this.alertCtrl.create
        //         ({
        //           message: `Your email is not yet verified, Please verify it to your email box
        //           before proceeding.`,
        //           buttons: 
        //           [
        //             {
        //               text: 'Ok',
        //               role: 'cancel'
        //             }
        //           ]
        //         })
        //         await alertController.present();
        //     }
        //     else 
        //     {
        //       var successLoading = await this.loadingCtrl.create
        //       ({
        //         message: 'Logging in...',
        //         spinner: 'lines-sharp'
        //       })   
        //       await successLoading.present();

        //       setTimeout(async () => {
        //         await successLoading.dismiss();
        //         if (success.user.displayName == 'admin')
        //         {
        //           this.router.navigateByUrl('adminpage')
        //         }
        //         else 
        //         {
        //           this.router.navigateByUrl('/tabs/tab1')
        //         }
        //         sessionStorage.setItem('user', JSON.stringify(success.user));
                
        //         this.Email1 = ''
        //         this.Password1 = ''
        //       }, 3000);
        //     }
        // })
        // .catch(async err => 
        //   {
        //       var alertError = await this.alertCtrl.create
        //       ({
        //         message: err.message,
        //         buttons: 
        //         [
        //           {
        //             text: 'Close',
        //             role: 'cancel'
        //           }
        //         ]
        //       })
        //       await alertError.present();
        //   })      
        this.dbservice.signIn({
          email: this.Email1,
          password: this.Password1
        })
        .subscribe({
          next: async (success) => 
          {
            //console.log("success", success)
            
            if(success.user.emailVerified == false)
            {
                var alertemailnotyetverified = await this.alertCtrl.create
                ({
                  message: 'Your email is not yet verified, Please verify it to your email box before proceeding.',
                  buttons: 
                  [
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
                })
                await alertemailnotyetverified.present();
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
                  this.router.navigateByUrl('/adminpage')
                } 
                else if (success.user.displayName == 'kitchen')
                {
                  this.router.navigateByUrl('/kitchen')
                }
                else if (success.user.displayName == 'rider')
                {
                  this.router.navigateByUrl('/rider')
                }
                else 
                {
                  this.router.navigateByUrl('/tabs/tab1')
                }
                sessionStorage.setItem('user', JSON.stringify(success.user));
                
                //email = '';
                //password = ''
                this.Email1 = ''
                this.Password1 = ''
              }, 3000);
            }  
          },
          error: async error => {
            //console.log("error", error.message)
            var alertError = await this.alertCtrl.create
            ({
              message: error.message,
              buttons: 
              [
                {
                  text: 'Close',
                  role:'cancel'
                }
              ]
            })
            await alertError.present();
          }
        });
      }

      navigateURL()
      {
        if (this.mainpage == 'ADMIN')
        {
            this.navigateadmin()
        }
        else if (this.mainpage == 'CUSTOMER')
        {
          this.navigatecustomer()
        }
        else 
        {
          this.router.navigateByUrl(`/${this.mainpage.toLowerCase()}`)
        }
      } 
}
