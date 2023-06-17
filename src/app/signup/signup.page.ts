import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DbserviceService } from '../services/dbservice.service';
import { AuthserviceService } from '../services/authservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private unsubscriber: Subject<void> = new Subject<void>();
  Email1: any;
  Password1: any;
  ishide = false;
  continueAsCustomer: any;
  isthisadmin = false;
  constructor(
    private navCtrl: NavController,
    //private auth: AuthServiceService,
    //private afstore: AngularFirestore,
    //private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private dbservice: DbserviceService,
    private afauth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick();
          var thesession = JSON.parse(sessionStorage.getItem('user') as any);
          if (thesession != null) {
            this.ishide = true;
            if (thesession.displayName == 'customer') {
              this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`;
              this.isthisadmin = false;
            } else {
              this.continueAsCustomer = `CONTINUE AS ${thesession.displayName.toUpperCase()}`;
              this.isthisadmin = true;
            }
          } else {
            this.ishide = false;
          }
        }, 0);
      });
    });
  }
  ResetPassword() {
    // this.alertCtrl
    //   .create({
    //     header: 'Reset Password',
    //     inputs: [
    //       {
    //         name: 'Email',
    //         placeholder: 'Please type your email',
    //         type: 'email',
    //       },
    //     ],
    //     buttons: [
    //       {
    //         text: 'Ok',
    //         handler: (data) => {
    //           console.log('hahaha', data);
    //           this.auth
    //             .ForgotPassword(data.Email)
    //             .then((success) => {
    //               this.alertCtrl
    //                 .create({
    //                   header: 'Success',
    //                   message:
    //                     'The reset password code has been sent to your email',
    //                 })
    //                 .then((els) => {
    //                   els.present();
    //                 });
    //             })
    //             .catch((error) => {
    //               this.alertCtrl
    //                 .create({
    //                   header: 'Error',
    //                   message: 'Email not found',
    //                 })
    //                 .then((els2) => {
    //                   els2.present();
    //                 });
    //             });
    //         },
    //       },
    //     ],
    //   })
    //   .then((El) => {
    //     El.present();
    //   });
  }

  navigateadmin() {
    this.router.navigateByUrl('adminpage');
  }
  navigatecustomer() {
    this.router.navigateByUrl('tabs');
  }

  gotosignin() {
    this.navCtrl.navigateForward('login');
  }

  // SignUp() {
  //   this.auth
  //     .SignUp(this.Email1, this.Password1)
  //     .then((res) => {
  //       this.loadingCtrl
  //         .create({
  //           message: 'Registering User...',
  //         })
  //         .then((el) => {
  //           el.present();
  //           res.user.updateProfile({
  //             displayName: 'customer',
  //           });

  //           sessionStorage.setItem('user', JSON.stringify(res.user));

  //           this.afstore
  //             .doc(`users/${res.user.uid}`)
  //             .set({
  //               Email: this.Email1,
  //               Uid: res.user.uid,
  //               FirstName: '',
  //               LastName: '',
  //               Address1: '',
  //               Address2: '',
  //               PhoneNumber: '',
  //             })
  //             .then((suc) => {})
  //             .catch((err) => {
  //               console.log('err', err);
  //             });

  //           setTimeout(() => {
  //             el.dismiss();
  //             this.router.navigateByUrl('/tabs');
  //             this.Email1 = '';
  //             this.Password1 = '';
  //           }, 3000);
  //         });
  //     })
  //     .catch((err) => {
  //       this.loadingCtrl
  //         .create({
  //           message: 'Registering User...',
  //         })
  //         .then((el) => {
  //           el.present();
  //           setTimeout(() => {
  //             el.dismiss();
  //             this.alertCtrl
  //               .create({
  //                 message: err.message,
  //               })
  //               .then((el) => {
  //                 el.present();
  //               });
  //           }, 3000);
  //         });
  //     });
  // }

  async SignUp()
  {
    this.dbservice.signUp
    ({
      email: this.Email1,
      password: this.Password1
    })
    .subscribe({
      next: async (success) => 
      {
        success.user.updateProfile({
          displayName: 'customer',
        });
        var specificDataObject = {
          Email: this.Email1,
          Uid: success.user.uid,
          FirstName: '',
          LastName: '',
          Address1: '',
          Address2: '',
          PhoneNumber: '',
          pendingorder: false,
        };

        this.dbservice
          .postDatawithID(`users/${success.user.uid}`, specificDataObject)
          .then((suc) => {})
          .catch((err) => {
            alert(JSON.stringify(err));
          });

        success.user.sendEmailVerification()

          var alertController = await this.alertCtrl.create
          ({
            message: `We have sent you an email verification to ${this.Email1}, Once it is verified, you can go to login and use your account.`,
            backdropDismiss: false,
            buttons:
            [
              {
                text: 'Ok',
                handler: () =>
                {
                  this.Email1 = '';
                  this.Password1 = ''
                  this.afauth.signOut();
                }
              }
            ]
          })
          await alertController.present();
      },
      error: async error => 
      {
        //console.log("error", error.message)
        var errorAlertRegister = await this.alertCtrl.create
        ({
          message: error.message,
          buttons: 
          [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await errorAlertRegister.present();
      }
    });
    // await this.auth.SignUp(this.Email1, this.Password1)
    // .then(async (success) => 
    // {
    //         success.user.updateProfile({
    //           displayName: 'customer',
    //         });
    //         this.afstore
    //           .doc(`users/${success.user.uid}`)
    //           .set({
    //             Email: this.Email1,
    //             Uid: success.user.uid,
    //             FirstName: '',
    //             LastName: '',
    //             Address1: '',
    //             Address2: '',
    //             PhoneNumber: '',
    //             pendingorder: false
    //           })
    //           .then((suc) => {})
    //           .catch((err) => {
    //             console.log('err', err);
    //           });
    //   success.user.sendEmailVerification();
    //   var alertController = await this.alertCtrl.create
    //   ({
    //     message: `We have sent you an email verification to ${this.Email1}, Once it is verified, you can go to login and use your account.`,
    //     buttons: 
    //     [
    //       {
    //         text: 'Ok',
    //         handler: () => 
    //         {
    //           this.Email1 = '';
    //           this.Password1 = ''
    //           this.afauth.signOut();
    //         }
    //       }
    //     ]         
    //   })
    //   await alertController.present();
    // }).catch(async (err) => 
    // {
    //   var alertController = await this.alertCtrl.create
    //   ({
    //     message: err.message,
    //     buttons: 
    //     [
    //       {
    //         text: 'Ok',
    //         role: 'cancel'
    //       }
    //     ]         
    //   })
    //   await alertController.present();
    // })
  }
}
