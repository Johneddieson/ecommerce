import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.page.html',
  styleUrls: ['./addmaterial.page.scss'],
})
export class AddmaterialPage implements OnInit {
public itemName: string = ''
public gramsOnHand: string = ''
  constructor(private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
    private alertController: AlertController) 
    {
      this.afauth.authState.subscribe(user => 
        {
          if (user && user.uid)
          {

          }
        })
     }

  ngOnInit() {
  }
containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  containsOnlyLetters(str)
  {
    return /^[a-zA-Z\s]+$/.test(str);   
  }
  async addMaterial(itemname, gramsonhand)
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
      this.afstore
      .collection('Materials')
      .add({
        Itemname: itemname.value,
        Stock: parseInt(gramsonhand.value),
      })
      .then(async (success) => {
        var MaterialsSavedAlert = await this.alertController.create({
          message: 'Material added successfully!',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Close',
              role: 'cancel',
            },
          ],
        });
        await MaterialsSavedAlert.present();
        itemname.value = ''
        gramsonhand.value = ''
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
    }
  }

}
