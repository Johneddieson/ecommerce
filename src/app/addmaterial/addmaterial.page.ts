import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.page.html',
  styleUrls: ['./addmaterial.page.scss'],
})
export class AddmaterialPage implements OnInit {
public itemName: string = ''
public gramsOnHand: string = ''
  constructor(
    //private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private alertController: AlertController,
    private dbservice: DbserviceService
    ) 
    {
      this.afauth.authState.subscribe(user => 
        {
          if (user?.uid)
          {

          }
        })
     }

  ngOnInit() 
  {
  }
containsOnlyNumbers(str: any) {
    return /^[0-9]+$/.test(str);
  }
  containsOnlyLetters(str: any)
  {
    return /^[a-zA-Z\s]+$/.test(str);   
  }
  async addMaterial(itemname: any, gramsonhand: any)
  {
    if (!this.containsOnlyLetters(itemname.value) && 
    !this.containsOnlyNumbers(gramsonhand.value))
    {
      var alertErrorMessageItemnameandGramsonhand = await this.alertController.create
      ({
        header: 'Error',
        message: '● Itemname should be letters only <br><br>● Grams on hand should be number only',
        backdropDismiss: false,
        buttons: 
        [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]       
      })
      await alertErrorMessageItemnameandGramsonhand.present();
    }
    else if (!this.containsOnlyLetters(itemname.value))
    {
      var alertErrorMessageItemname = await this.alertController.create
      ({
        header: 'Error',
        message: '● Itemname should be letters only',
        backdropDismiss: false,
        buttons: 
        [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]       
      })
      await alertErrorMessageItemname.present();
    }
    else if (!this.containsOnlyNumbers(gramsonhand.value))
    {
      var alertErrorMessageGramsonhand = await this.alertController.create
      ({
        header: 'Error',
        message: '● Grams on hand should be numbers only',
        backdropDismiss: false,
        buttons: 
        [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]       
      })
      await alertErrorMessageGramsonhand.present();
    }
    else 
    {
      var specificObject = 
      {
        Itemname: itemname.value,
        Stock: parseInt(gramsonhand.value)   
      }
      this.dbservice.postData('Materials', specificObject)
      .then(async (success) => 
      {
        var materialsavedalert = await this.alertController.create
        ({
          message: 'Material added successfully',
          backdropDismiss: false,
          buttons: 
          [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await materialsavedalert.present();
      }).catch(async (err) => 
      {
        var materialerrorsavedalert = await this.alertController.create
        ({
          message: JSON.stringify(err),
          backdropDismiss: false,
          buttons: 
          [
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })
        await materialerrorsavedalert.present();
      })
      // this.afstore
      // .collection('Materials')
      // .add({
      //   Itemname: itemname.value,
      //   Stock: parseInt(gramsonhand.value),
      // })
      // .then(async (success) => {
      //   var MaterialsSavedAlert = await this.alertController.create({
      //     message: 'Material added successfully!',
      //     backdropDismiss: false,
      //     buttons: [
      //       {
      //         text: 'Close',
      //         role: 'cancel',
      //       },
      //     ],
      //   });
      //   await MaterialsSavedAlert.present();
      //   itemname.value = ''
      //   gramsonhand.value = ''
      // })
      // .catch((err) => {
      //   alert(JSON.stringify(err));
      // });
    }
  }

}
