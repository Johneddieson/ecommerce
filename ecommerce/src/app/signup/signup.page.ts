import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // email: any;
  // password: any;
  // firstname: any;
  // lastname: any
  // address1: any
  // address2: any
  // phonenumber: any
  //   constructor(private navCtrl: NavController,private auth: AuthServiceService,
  //     private afstore: AngularFirestore,
  //     private afauth: AngularFireAuth,private loadingCtrl: LoadingController,
  //     private alertCtrl: AlertController, private router: Router) { }
  //   gotosignin() {
  //       this.navCtrl.navigateForward('login')
  //     }
  //     SignUp() {

  //       this.auth.SignUp(this.email, this.password).then(res => {
  //   this.loadingCtrl.create({
  //   message: 'Registering User...',

  // }).then(el => {
  //   el.present()
  //   res.user.updateProfile({
  //     displayName: 'customer'
  //   })

  // sessionStorage.setItem('user', JSON.stringify(res.user))

  // this.afstore.doc(`users/${res.user.uid}`).set({
  //   Email: this.email == undefined ? "" : this.email,
  //   Uid: res.user.uid,
  //   FirstName: this.firstname == undefined ? "" : this.firstname,
  //   LastName: this.lastname == undefined ? "" : this.lastname,
  //   Address1: this.address1 == undefined ? "" : this.address1,
  //   Address2: this.address2 == undefined ? "" : this.address2,
  //   PhoneNumber: this.phonenumber== undefined ? "" : this.phonenumber
  // }).then(suc => {

  // }).catch(err => {
  //   console.log("err", err)
  // })

  // setTimeout(() => {
  //   el.dismiss()
  //   this.email = ''
  //   this.password = ''
  //   this.firstname= ''
  //   this.lastname= ''
  //   this.address1= ''
  //   this.address2= ''
  //   this.phonenumber= ''
  //   this.router.navigateByUrl('/tabs')
  // }, 3000)

  // })

  // }).catch(err => {
  //   this.loadingCtrl.create({
  //     message: 'Registering User...',
  //   }).then(el => {
  //     el.present()
  //   setTimeout(() => {
  //     el.dismiss()
  //     this.alertCtrl.create({
  //       message: err.message,

  //     }).then(el => {
  //       el.present()
  //     })

  //   }, 3000)
  //   })
  // })
  //     }
  //   ngOnInit() {
  //   }

  private unsubscriber: Subject<void> = new Subject<void>();
  Email1: any;
  Password1: any;
  ishide = false;
  continueAsCustomer;
  isthisadmin = false;
  constructor(
    private navCtrl: NavController,
    private auth: AuthServiceService,
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick();
          var thesession = JSON.parse(sessionStorage.getItem('user'));
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
    this.alertCtrl
      .create({
        header: 'Reset Password',
        inputs: [
          {
            name: 'Email',
            placeholder: 'Please type your email',
            type: 'email',
          },
        ],
        buttons: [
          {
            text: 'Ok',
            handler: (data) => {
              console.log('hahaha', data);
              this.auth
                .ForgotPassword(data.Email)
                .then((success) => {
                  this.alertCtrl
                    .create({
                      header: 'Success',
                      message:
                        'The reset password code has been sent to your email',
                    })
                    .then((els) => {
                      els.present();
                    });
                })
                .catch((error) => {
                  this.alertCtrl
                    .create({
                      header: 'Error',
                      message: 'Email not found',
                    })
                    .then((els2) => {
                      els2.present();
                    });
                });
            },
          },
        ],
      })
      .then((El) => {
        El.present();
      });
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
    await this.auth.SignUp(this.Email1, this.Password1)
    .then(async (success) => 
    {
            success.user.updateProfile({
              displayName: 'customer',
            });
            this.afstore
              .doc(`users/${success.user.uid}`)
              .set({
                Email: this.Email1,
                Uid: success.user.uid,
                FirstName: '',
                LastName: '',
                Address1: '',
                Address2: '',
                PhoneNumber: '',
              })
              .then((suc) => {})
              .catch((err) => {
                console.log('err', err);
              });
      success.user.sendEmailVerification();
      var alertController = await this.alertCtrl.create
      ({
        message: `We have sent you an email verification to ${this.Email1}, Once it is verified, you can go to login and use your account.`,
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
    }).catch(async (err) => 
    {
      var alertController = await this.alertCtrl.create
      ({
        //message: JSON.stringify(err),
        message: err.message,
        buttons: 
        [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]         
      })
      await alertController.present();
    })
  }
}
