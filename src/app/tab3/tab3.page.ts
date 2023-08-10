import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessengerService } from './../messenger.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, LoadingController } from '@ionic/angular';
import { first, last } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { VonageapisendsmsService } from '../services/vonageapi/vonageapisendsms.service';
import { Sendsms } from '../interface/sendsms';
import { Sendemail } from '../interface/sendemail';
import { SendemailapiService } from '../services/sendemailapi/sendemailapi.service';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  getCartDetails: any = []
sub: any
firstname: any;
lastname: any;
address1: any;
address2: any;
phonenumber: any;
isDisabled = true;
isEdit = false
name: any;
forcheckout: any
public aFormGroup!: FormGroup;
currentuserid: string = ''
vonageModal!: Sendsms;
myotpcode: string = '' 
sendEmailModal!: Sendemail
currentuseremail: string = ''
public email : string = ""
  constructor(private actRoute: ActivatedRoute, 
    //private afstore: AngularFirestore, 
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private msg: MessengerService,
    private dbservice: DbserviceService,
    private formBuilder: FormBuilder,
    private vonageservice: VonageapisendsmsService,
    private sendemailapiservice: SendemailapiService,
    private authservice: AuthserviceService
    ) 
    {
    this.afauth.authState.subscribe((data) => 
    {
      if (data?.uid)
      {
        this.currentuserid = data?.uid
        
        this.dbservice.getDataById('users', data?.uid).subscribe((data: any) => 
        {
          //this.aFormGroup.controls['firstname'].setValue(data.FirstName);
          //this.aFormGroup.controls['lastname'].setValue(data.LastName);  
          //this.aFormGroup.controls['phonenumber'].setValue(data.PhoneNumber);
          //this.aFormGroup.controls['address'].setValue(data.Address1);
          //this.firstname = data.FirstName;
          //this.lastname = data.LastName;
          //this.phonenumber = data.PhoneNumber;
          //this.address1 = data.Address1;
          this.myotpcode = data.otpcodenumber == null || undefined ? 0 : data.otpcodenumber  
          this.currentuseremail = data.Email;

          var emailsplit = data.Email.split("@");
          this.email = emailsplit[0]
        });
      }
    })
  this.formUserValidation()
  }
  formUserValidation()
  {
    this.aFormGroup = this.formBuilder.group
    ({
      firstname: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z ]+$/),
        ]
        ],
      lastname: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(09)[\d]{9}$/
          ),
          ],
      ],
      address: 
      [
        '',
        [
          Validators.required
        ]
      ]
    })
  }
  get f() {
    //console.log(this.aFormGroup.controls)
    return this.aFormGroup.controls;
  }

  // Edit() {
  //   if (sessionStorage.getItem('cart')) {
  //     this.getCartDetails = JSON.parse(sessionStorage.getItem('cart'))
  //   }
  //   console.log("get cart", this.getCartDetails)
  //   this.loadingCtrl.create({
  //     message: 'Editing Please Wait...'
  //   }).then(loading => {
  //     loading.present()
  //     this.alertCtrl.create({
  //       message: 'You edited your information successfully',
  //       buttons: [
  //         {
  //           text: 'Ok',
  //           role: 'cancel'
  //         }
  //       ]
  //     }).then(alert => {

  //    setTimeout(() => {
  //     loading.dismiss()
  //     alert.present()
  //     this.meReference.update({
  //       FirstName: this.firstname,
  //       LastName: this.lastname,
  //       Address1: this.address1,
  //       Address2: this.address2,
  //       PhoneNumber: this.phonenumber
  //     })
  //     if (this.getCartDetails.length != 0) {
  //       this.router.navigateByUrl('/checkout')
  //     }
  //    }, 3000)
  //     }).catch(alerterr => {

  //     })
     
  //   }).catch(loadingerr => {

  //   })
  
  // }

  async ngOnInit() 
  {
    // setInterval(() => 
    // {
    //   if (this.name == "forcheckout")
    //   {
    //     this.forcheckout = true
    //   }
    //   else 
    //   {
    //     this.forcheckout = false
    //   }
    // }, 0)
    // if (this.name == 'edit')
    // {
    //   this.isEdit = true
    // }
    // else 
    // {
    //   this.isEdit = false
    //   var alertCtrl = await this.alertCtrl.create
    //   ({
    //     header: 'Warning!',
    //     message: 'Kindly strictly check your location if correct, Once your are done finalizing your location, after confirming your order, dont move to the location where you located until your order is delivered thanks!.',
    //     buttons: 
    //     [
    //       {
    //         text: 'Ok!',
    //         role: 'cancel'
    //       }
    //     ]
    //   })
    //   await alertCtrl.present();
    // }
  }

  async getCurrentLocation()
  {
    var loading =  await this.loadingCtrl.create
    ({
      message: 'Getting your location...',
      spinner: 'bubbles'
    })
    await loading.present()
//  this.geo.getCurrentPosition().then((success) => 
//  {
//   this.msg.myLoc(success.coords.latitude, success.coords.longitude).subscribe(async data  => 
//     {
//       var myaddress = data.Response.View[0].Result[0].Location.Address
//       var myaddress2 = data.Response.View[0].Result[1].Location.Address
//         this.address1 = `${myaddress.Street} ${myaddress.District} ${myaddress.Label}`
//         this.address2 = `${myaddress.Street} ${myaddress2.District} ${myaddress2.Label}`
//         await loading.dismiss()
    
//         var alertIfAddressIsWrong = await this.alertCtrl.create
//         ({
//           message: `If your current location doesn't correct, you can edit it manually.`,
//           buttons: 
//           [
//             {
//               text: 'Ok',
//               role: 'cancel'              
//             }
//           ]          
//         })
//         await alertIfAddressIsWrong.present();
//         this.isDisabled = false
//       })
//  })
  }

  // async Edit() 
  // {
  //   if (this.name != 'forcheckout')
  //   {
  //     var cartArray = JSON.parse(sessionStorage.getItem('cart') as any);
      
  //     var loadingCtrl = await this.loadingCtrl.create
  //     ({
  //       message: 'Please Wait...',
  //       spinner: 'bubbles'
  //     })
  //     await loadingCtrl.present();
  //     var alertSuccess = await this.alertCtrl.create
  //     ({
  //       message: 'You edited your information successfully',
  //       buttons: 
  //       [
  //         {
  //           text: 'Ok',
  //           role: 'cancel'
  //         }
  //       ]
  //     })
  //     }
  //   else 
  //   {
  //     if (this.address1 === '')
  //     {
  //         var errAlert = await this.alertCtrl.create
  //         ({
  //           message: `Address should'nt be empty`,
  //           buttons: [
  //             {
  //               text: 'Ok',
  //               role: 'cancel'
  //             }
  //           ]
  //         })
  //         await errAlert.present()
  //     }
  //     else
  //     {
  //       this.loadingCtrl.create({
  //         message: 'Please Wait...'
  //       }).then(loading => {
  //         loading.present()
  //        setTimeout(() => {
  //         loading.dismiss()
  //         this.router.navigateByUrl('/checkout')
  //        }, 3000)
  //       }).catch(loadingerr => {
    
  //       })
  //     }
  //   }
  // }

   async Edit()
  {
    this.sendSMS();

    var alertSentOtp = await this.alertCtrl.create
    ({
      header: `We've sent you an otp code number to your email ${this.currentuseremail}, type the code here to proceed`,
      backdropDismiss: false,
      inputs: 
      [
        {
          type: 'number',
          max: 6,
          label: 'otp',
          name: 'otp',
          placeholder: 'Enter otp code here...'
        }
      ],
      buttons: 
      [
        {
          text: 'Verify',
          handler: (async (otp) => 
          {
            if (otp.otp == this.myotpcode.toString())
            {
              var specificdataobject = {
                FirstName: this.aFormGroup.controls['firstname'].value,
                LastName: this.aFormGroup.controls['lastname'].value,
                PhoneNumber: this.aFormGroup.controls['phonenumber'].value,
                Address1: this.aFormGroup.controls['address'].value,
              };
              this.dbservice
                .updateData(this.currentuserid, specificdataobject, 'users')
                .then(async (success) => {
                  var buttontext = '';
                  var cartItem = sessionStorage.getItem('cart');
                  if (
                    cartItem != null ||
                    JSON.parse(cartItem as any).length > 0
                  ) {
                    buttontext = 'Proceed To Checkout';
                  } else {
                    buttontext = 'Go back';
                  }
                  var alertEditSuccess = await this.alertCtrl.create({
                    message: 'You edited your information successfully.',
                    backdropDismiss: false,
                    buttons: [
                      {
                        text: `${buttontext}`,
                        handler: async () => {
                          if (
                            cartItem != null ||
                            JSON.parse(cartItem as any).length > 0
                          ) {
                            this.router.navigateByUrl('/checkout');
                           }
                           else 
                           {
                            this.router.navigateByUrl('/tabs/tab1');
                           }
                           alertSentOtp.dismiss();
                           setTimeout(() => {
                             this.updatecodetonone()
                           }, 3000);
                        },
                      },
                    ],
                  });
                  await alertEditSuccess.present();
                })
                .catch(async (err) => {
                  var alertEditError = await this.alertCtrl.create({
                    message: JSON.stringify(err),
                    buttons: [
                      {
                        text: 'Close',
                        role: 'cancel',
                      },
                    ],
                  });
                  await alertEditError.present();
                }); 
            }
          return false
          })
        },
        {
          text: "Didn't receive? Send again!",
          handler: () => 
          {
            this.sendSMS();
            return false
          }
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    })
    await alertSentOtp.present();
    // var specificdataobject = 
    // {
    //   FirstName: this.aFormGroup.controls['firstname'].value,
    //   LastName: this.aFormGroup.controls['lastname'].value,
    //   PhoneNumber: this.aFormGroup.controls['phonenumber'].value,
    //   Address1: this.aFormGroup.controls['address'].value
    // }
    // this.dbservice.updateData(this.currentuserid, specificdataobject, 'users').then(async (success) => 
    // {
    //   var buttontext = ""
    //   var cartItem = sessionStorage.getItem('cart');
    //   if (cartItem != null || JSON.parse(cartItem as any).length > 0)
    //   {
    //     buttontext = "Proceed To Checkout"
    //   }
    //   else 
    //   {
    //     buttontext = "Go back"
    //   }
    //   var alertEditSuccess = await this.alertCtrl.create
    //   ({
    //     message: 'You edited your information successfully.',
    //     backdropDismiss: false,
    //     buttons:
    //     [
    //       {
    //         text: `${buttontext}`,
    //         handler: () => 
    //         {

    //           if (cartItem != null || JSON.parse(cartItem as any).length > 0)
    //           {
    //             this.router.navigateByUrl('/checkout')
    //           }
    //         }
    //       }
    //     ]
    //   })
    //   await alertEditSuccess.present();
    // }).catch(async (err) => 
    // {
    //    var alertEditError = await this.alertCtrl.create
    // ({
    //   message: JSON.stringify(err),
    //   buttons: 
    //   [
    //     {
    //       text: 'Close',
    //       role: 'cancel'
    //     }
    //   ]
    // })
    // await alertEditError.present();
    // })
  }
  async updateCurrentUserOtpCode(otpcode: any)
  {
    var specificdata = 
    {
      otpcodenumber: otpcode
    }
      this.dbservice.updateData(this.currentuserid, specificdata, 'users').then(() => {})
      .catch(() => {})
  }
  async sendSMS()
  {
      var newotpcode = Math.floor(Math.random() * 899999 + 100000)
      this.updateCurrentUserOtpCode(newotpcode);
      this.sendEmailModal = 
      {
        to: this.currentuseremail,
        subject: "Hi! your otpcode is",
        html: `<h1>${newotpcode}</h1>`,
        text: `${newotpcode}`
      }
      this.sendemailapiservice.sendEmailApi(this.sendEmailModal).subscribe((data) => {})
      // this.vonageModal = 
      // {
      //   text: `Hi! your otpcode is ${newotpcode}`,
      //   to: phonenumber,
      //   from: 'DMixologist'
      // }
      // this.vonageservice.sendSms(this.vonageModal).subscribe((data) => 
      // {
      //   console.log("the response of sending sms", data);
      // })  
  }
  async updatecodetonone()
  {
    var specificData = 
    {
      otpcodenumber: 0,
      //PhoneNumber: ""
    }
    this.dbservice.updateData(this.currentuserid, specificData, 'users').then(() => {})
    .catch(() => {})
  }

  onScroll(event: any)
    {
      //console.log("Wew", event.detail.scrollTop)
      if (event.detail.scrollTop > 300)
      {
        $('.sticky-top').addClass('shadow-sm').css('top', '0px');
      }
      else 
      {
        $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
      }
    }

    
    backtoTop()
    {
      this.content.scrollToTop(400);
    }

    logout()
    {
      this.authservice.SignOut()
    }

}
