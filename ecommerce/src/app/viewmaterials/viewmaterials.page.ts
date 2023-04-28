import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viewmaterials',
  templateUrl: './viewmaterials.page.html',
  styleUrls: ['./viewmaterials.page.scss'],
})
export class ViewmaterialsPage implements OnInit {
public materialList: any[] = []
public materialCollection: AngularFirestoreCollection
public sub: any
  constructor(private afstore: AngularFirestore, 
    private afauth: AngularFireAuth,
    private alertController: AlertController) 
    {
      this.retrieveMaterials('') 
    }

  ngOnInit() {
  }
  retrieveMaterials(itemnamevalue)
  {
    this.afauth.authState.subscribe(user => 
      {
        if (user && user.uid)
        {
          this.materialCollection = this.afstore.collection('Materials')
          this.sub = this.materialCollection.snapshotChanges()
          .pipe(map(actions => actions.map(a => 
            {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            })))
            .subscribe(data => 
              {
                if (itemnamevalue != '')
                {
                  data = data.filter(f => f.Itemname.toLowerCase().includes(itemnamevalue.toLowerCase()))
                }
                this.materialList = data
              })
        }
      })
  }
  async specificMaterialModal(data: any)
  {
    //console.log("the data", data)
    var alertController = await this.alertController.create
    ({
      header: data.Itemname,
      backdropDismiss: false,
      inputs: 
      [
        {
          placeholder: 'Enter grams on hand',
          label: 'Grams',
          value: data.Stock,
          type: 'number'
        }
      ],
      buttons: 
      [
        {
           text: 'Save',
           handler: (datainput) => 
           {
            this.afstore.doc(`Materials/${data.id}`).update
            ({
              Stock: parseInt(datainput[0])
            }).then(async successEdit => 
              {
                  var alertSuccessEditedSpecificMaterial = await this.alertController
                  .create
                  ({
                    message: 'Updated successfully',
                    backdropDismiss: false,
                    buttons: 
                    [
                      {
                        text: 'Close',
                        role: 'cancel'
                      }
                    ]
                  })
                  await alertSuccessEditedSpecificMaterial.present();
              }).catch(err => 
                {
                  alert(JSON.stringify(err))
                })
           } 
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    })
    await alertController.present();
  }
  async searchItems()
  {
    var alertSearchItems = await this.alertController.create
    ({
      backdropDismiss: false,
      inputs: 
      [
        {
          placeholder: 'Search Itemname here...',
          label: 'Itemname'
        }
      ],
      buttons: 
      [
        {
          text: 'Search',
          handler: async (Itemnamevalue) => 
          {
            //console.log("Itemnamevalue", Itemnamevalue)
            if (Itemnamevalue[0] == '')
            {
              var errorSearch = await this.alertController.create
              ({
                message: "Item name field shouldn't be empty",
                buttons: 
                [
                  {
                    text: 'Close',
                    role: 'cancel'
                  }
                ]
              })
              await errorSearch.present();
            } 
            else 
            {
              this.retrieveMaterials(Itemnamevalue[0])
            }
          }
        },
        {
          text: 'SHOW ALL',
          handler: () => 
          {
            this.retrieveMaterials('')
          }
        },
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    })
    await alertSearchItems.present();
  }

}
