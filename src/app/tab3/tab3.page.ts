import { MessengerService } from './../messenger.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { first, last } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
  constructor(private actRoute: ActivatedRoute, 
    //private afstore: AngularFirestore, 
    //private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private router: Router,
    private msg: MessengerService,
    //private geo: Geolocation
    ) 
    {
    //   this.name = this.actRoute.snapshot.paramMap.get('name')
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
    //     this.meReference = this.afstore.doc(`users/${data.uid}`)
    //     this.sub = this.meReference.valueChanges().subscribe(data => {
    //         this.firstname = data.FirstName
    //         this.lastname = data.LastName
    //         this.address1 = data.Address1
    //         this.address2 = data.Address2
    //         this.phonenumber = `${data.PhoneNumber}`
    //     })
    //   }
    // })
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

  async ngOnInit() {

    setInterval(() => 
    {
      if (this.name == "forcheckout")
      {
        this.forcheckout = true
      }
      else 
      {
        this.forcheckout = false
      }
    }, 0)
    if (this.name == 'edit')
    {
      this.isEdit = true
    }
    else 
    {
      this.isEdit = false
      var alertCtrl = await this.alertCtrl.create
      ({
        header: 'Warning!',
        message: 'Kindly strictly check your location if correct, Once your are done finalizing your location, after confirming your order, dont move to the location where you located until your order is delivered thanks!.',
        buttons: 
        [
          {
            text: 'Ok!',
            role: 'cancel'
          }
        ]
      })
      await alertCtrl.present();
    }
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

  async Edit() {
    if (this.name != 'forcheckout')
    {
      var cartArray = JSON.parse(sessionStorage.getItem('cart') as any);
      
      var loadingCtrl = await this.loadingCtrl.create
      ({
        message: 'Please Wait...',
        spinner: 'bubbles'
      })
      await loadingCtrl.present();
      var alertSuccess = await this.alertCtrl.create
      ({
        message: 'You edited your information successfully',
        buttons: 
        [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      })
      // setTimeout(async () => {
      //   await loadingCtrl.dismiss();
      //       this.meReference.update({
      //         FirstName: this.firstname,
      //         LastName: this.lastname,
      //         Address1: this.address1,
      //         Address2: this.address2,
      //         PhoneNumber: this.phonenumber,
      //       }).then(async success => {
      //         await alertSuccess.present();
      //         if (cartArray.length > 0) 
      //         {
      //           this.router.navigateByUrl('/checkout'); 
      //         }  
      //       })
      // }, 2000);
      }
    else 
    {
      if (this.address1 === '')
      {
          var errAlert = await this.alertCtrl.create
          ({
            message: `Address should'nt be empty`,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
          })
          await errAlert.present()
      }
      else
      {
        this.loadingCtrl.create({
          message: 'Please Wait...'
        }).then(loading => {
          loading.present()
         setTimeout(() => {
          loading.dismiss()
          // this.meReference.update({
          //   FirstName: this.firstname,
          //   LastName: this.lastname,
          //   Address1: this.address1,
          //   Address2: this.address2,
          //   PhoneNumber: this.phonenumber
          // })
          this.router.navigateByUrl('/checkout')
         }, 3000)
          
         
        }).catch(loadingerr => {
    
        })
      }
    }
  }
}
