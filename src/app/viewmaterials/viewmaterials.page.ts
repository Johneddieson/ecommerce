import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-viewmaterials',
  templateUrl: './viewmaterials.page.html',
  styleUrls: ['./viewmaterials.page.scss'],
})
export class ViewmaterialsPage implements OnInit {
public materialList: any[] = []
public sub: any
  constructor(
    private alertController: AlertController,
    private afauth: AngularFireAuth,
    private dbservice: DbserviceService
    ) 
    {
      this.afauth.authState.subscribe((user) => 
      {
        if (user?.uid)
        {
          this.retrieveMaterials('')
        }
      }) 
    }

  ngOnInit() {
  }
  retrieveMaterials(itemnamevalue: any)
  {
    this.dbservice.getData('Materials').subscribe((data) => 
    {
                  if (itemnamevalue != '')
                  {
                    data = data.filter(f => f.Itemname.toLowerCase().includes(itemnamevalue.toLowerCase()))
                  }
                  this.materialList = data
    })
    // this.afauth.authState.subscribe(user => 
    //   {
    //     if (user && user.uid)
    //     {
    //       this.materialCollection = this.afstore.collection('Materials')
    //       this.sub = this.materialCollection.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => 
    //         {
    //           return {
    //             id: a.payload.doc.id,
    //             ...a.payload.doc.data() as any
    //           }
    //         })))
    //         .subscribe(data => 
    //           {
    //             if (itemnamevalue != '')
    //             {
    //               data = data.filter(f => f.Itemname.toLowerCase().includes(itemnamevalue.toLowerCase()))
    //             }
    //             this.materialList = data
    //           })
    //     }
    //   })
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
            var specificobject = 
            {
              Stock: parseInt(datainput[0])
            }
            this.dbservice.updateData(data.id, specificobject, 'Materials').then(async (el) => 
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
            }).catch((err) => 
            {
              alert(JSON.stringify(err));
            })
            // this.afstore.doc(`Materials/${data.id}`).update
            // ({
            //   Stock: parseInt(datainput[0])
            // }).then(async successEdit => 
            //   {
            //       var alertSuccessEditedSpecificMaterial = await this.alertController
            //       .create
            //       ({
            //         message: 'Updated successfully',
            //         backdropDismiss: false,
            //         buttons: 
            //         [
            //           {
            //             text: 'Close',
            //             role: 'cancel'
            //           }
            //         ]
            //       })
            //       await alertSuccessEditedSpecificMaterial.present();
            //   }).catch(err => 
            //     {
            //       alert(JSON.stringify(err))
            //     })
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
