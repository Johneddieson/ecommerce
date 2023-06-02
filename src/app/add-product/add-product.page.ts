import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertController, IonInput, IonModal, LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbserviceService } from '../services/dbservice.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  public registerForm!: FormGroup;
  photoLink: any;
  withPhoto: boolean = false;
  public isValid: boolean = false
  public errMsg: string = ''
  public validationMessageObject: object = {}
  public hideInputFieldsforMilkteaAndFruitTea: boolean = true 
  //public productReference: AngularFirestoreCollection
  //public sub;
  public materialArray : any[] = []
  //public sub2;
  //materialReference: AngularFirestoreCollection
  public arrayForMaterial: any[] = []
  //materialEachElementReference: AngularFirestoreDocument
  public disableSaveChangesButton: boolean = true
  @ViewChild(IonInput) myInputVariable!: IonInput;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    //private afstore: AngularFirestore
    private afauth: AngularFireAuth,
    private dbservice: DbserviceService,
  ) 
  {
    this.afauth.authState.subscribe((data) => 
    {
      if (data?.uid)
      {
          this.dbservice.getData('Materials')
          .subscribe((datamaterials) => 
          {
            datamaterials =  datamaterials.sort((a, b) => 
           {
            var textA = a.Itemname.toUpperCase();
            var textB = b.Itemname.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
           })
           this.materialArray = datamaterials
          })
        }
    })
    this.formvalidation()
    // this.materialReference = this.afstore.collection(`Materials`, ref => ref.orderBy('Itemname'))
    // this.sub2 = this.materialReference.snapshotChanges()
    //   .pipe(map(actions => actions.map(a => {
    //     return {
    //       id: a.payload.doc.id,
    //       ...a.payload.doc.data() as any
    //     }
    //   }))).subscribe(data => {
    //     this.materialArray = data
    //   })
  }

  ngOnInit() {
    this.photoLink =
      'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308';
  }
  formvalidation()
  {
    this.registerForm = this.formBuilder.group({
      category: 
      [
        '', 
        [
        Validators.required,
        Validators.pattern(/^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/),
        Validators.pattern(/^([^0-9]*)$/)
        ]
      ],
      productname: 
      [
        '',
        [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/)
        ]
      ],
      unitprice: 
      [
        '',
        [
          Validators.required,
          // this.customPatternValid({
          //   pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          //   msg: 'This format is not allowed',
          // }),
          Validators.pattern(/^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/),
          
          // this.customPatternValid({
          //   pattern: /^([^-]*)$/,
          //   msg: 'Negative is not allowed',
          // }),
          Validators.pattern(/^([^-]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!_]*)$/,
          //   msg: 'Under Score is not allowed',
          // }),
          Validators.pattern(/^([^?!_]*)$/),
  
  
          // this.customPatternValid({
          //   pattern: /^([^?!=]*)$/,
          //   msg: 'Equal is not allowed',
          // }),
          Validators.pattern(/^([^?!=]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!+]*)$/,
          //   msg: 'Plus is not allowed',
          // }),
          Validators.pattern(/^([^?!+]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^.?!.]*)$/,
          //   msg: 'Period is not allowed',
          // }),
          Validators.pattern(/^([^.?!.]*)$/),
        ]
      ],
      mediumprice: 
      [
        '',
        [        
          Validators.required,
          // this.customPatternValid({
          //   pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          //   msg: 'This format is not allowed',
          // }),
          Validators.pattern(/^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/),
          
          // this.customPatternValid({
          //   pattern: /^([^-]*)$/,
          //   msg: 'Negative is not allowed',
          // }),
          Validators.pattern(/^([^-]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!_]*)$/,
          //   msg: 'Under Score is not allowed',
          // }),
          Validators.pattern(/^([^?!_]*)$/),
  
  
          // this.customPatternValid({
          //   pattern: /^([^?!=]*)$/,
          //   msg: 'Equal is not allowed',
          // }),
          Validators.pattern(/^([^?!=]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!+]*)$/,
          //   msg: 'Plus is not allowed',
          // }),
          Validators.pattern(/^([^?!+]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^.?!.]*)$/,
          //   msg: 'Period is not allowed',
          // }),
          Validators.pattern(/^([^.?!.]*)$/),]
      ],
      largeprice: 
      [
        '',
        
        [
          Validators.required,
          // this.customPatternValid({
          //   pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          //   msg: 'This format is not allowed',
          // }),
          Validators.pattern(/^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/),
          
          // this.customPatternValid({
          //   pattern: /^([^-]*)$/,
          //   msg: 'Negative is not allowed',
          // }),
          Validators.pattern(/^([^-]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!_]*)$/,
          //   msg: 'Under Score is not allowed',
          // }),
          Validators.pattern(/^([^?!_]*)$/),
  
  
          // this.customPatternValid({
          //   pattern: /^([^?!=]*)$/,
          //   msg: 'Equal is not allowed',
          // }),
          Validators.pattern(/^([^?!=]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^?!+]*)$/,
          //   msg: 'Plus is not allowed',
          // }),
          Validators.pattern(/^([^?!+]*)$/),
  
          // this.customPatternValid({
          //   pattern: /^([^.?!.]*)$/,
          //   msg: 'Period is not allowed',
          // }),
          Validators.pattern(/^([^.?!.]*)$/),
        ]
      ],
      materials: 
      [
        '',
        [Validators.required]
      ]
    });
  }
  get f() {
    //console.log(this.aFormGroup.controls)
    return this.registerForm.controls;
  }
  customPatternValid(config: any): ValidatorFn | any {
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }
  reset() {
    console.log('wew', this.myInputVariable.value);

    this.myInputVariable.value = '';
  }
  fileChanged(event: any) {
    const files = event.target.files;
    console.log('the files', files);
    const data = new FormData();
    data.append('file', files[0]);
    //00fb1c6ab7c377f68517
    // data.append('UPLOADCARE_PUB_KEY', '760e7038539ea9dd5176')
    data.append('UPLOADCARE_PUB_KEY', '2f6b781d802ebb97d2e3');
    this.http
      .post('https://upload.uploadcare.com/base/', data)
      .subscribe((events: any) => {
        var json = { events } as any;
        for (var prop in json) {
          console.log('wew', json[prop].file);
          for (const variables of files) {
            this.photoLink = `https://ucarecdn.com/${json[prop].file}/${variables.name}`;
          }
        }
        this.withPhoto = true;
      });
  }
 async submit() 
 {
  var isvalid = Object.assign(this.validation());
  if (isvalid.isValid == false) 
  {
    var alertNotValid = await this.alertCtrl.create({
      header: 'This fields must be in the correct format',
      message: `<b>${isvalid.errMessage}</b>`,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ],
    });
    await alertNotValid.present();
  } 
  else 
  {
    //this.dbservice.getData('Products').subscribe(async (data) => 
    //{
      // var existing = data.filter(
      //   (f) =>
      //     f.Category == this.f['category'].value &&
      //     f.ProductName.trimLeft() ==
      //     this.f['productname'].value.trimLeft()
      // );
      // if (existing.length > 0) 
      // {
      //   var alertExisting = await this.alertCtrl.create({
      //     message: `${this.registerForm.value.productname} in the ${this.registerForm.value.category} category 
      //             already exists.`,
      //     buttons: [
      //       {
      //         text: 'Ok',
      //         role: 'cancel',
      //       },
      //     ],
      //   });
      //   await alertExisting.present();
      // } 
     // else 
      //{
        if (this.withPhoto != false) 
        {
          var alertNoPhoto = await this.alertCtrl.create({
            message: 'Please choose a photo',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
              },
            ],
          });
          await alertNoPhoto.present();
        } 
        else 
        {
          this.showMaterialsModal();
        }
      //}
    //});
    // this.productReference = this.afstore.collection('Products')
    // this.sub = this.productReference.get()
    // .pipe(map(actions => {
    //   var tempdoc = actions.docs.map((doc) => {
    //     return {id: doc.id, ...doc.data() as any}
    //   })
    //   return tempdoc
    // }))
    // .subscribe(async data => {

    //   var existing = data.filter(f => f.Category == this.registerForm.value.category && f.ProductName.trimLeft() == this.registerForm.value.productname.trimLeft())
    //   if (existing.length > 0)
    //   {
    //       var alertExisting = await this.alertCtrl.create({
    //         message: `${this.registerForm.value.productname} in the ${this.registerForm.value.category} category
    //         already exists.`,
    //         buttons: [
    //           {
    //             text: 'Ok',
    //             role: 'cancel'
    //           }
    //         ]
    //       })
    //       await alertExisting.present()
    //   }
    //   else
    //   {
    //     if (this.withPhoto != false)
    //     {
    //       var alertNoPhoto = await this.alertCtrl.create
    //       ({
    //         message: 'Please choose a photo',
    //         buttons:
    //         [
    //           {
    //             text: 'Ok',
    //             role: 'cancel'
    //           }
    //         ]
    //       })
    //       await alertNoPhoto.present();
    //     }
    //     else
    //     {
    //       this.showMaterialsModal()

    //     }
    //   }
    // })
  }
  }

  async saveFunction() 
  {
    var specificObject = {
        Category: this.registerForm.value.category,
        GramsPerOrder: parseInt("0"),
        ImageUrl: this.photoLink,
        LargeGramsPerOrder: parseInt("0"),
        LargePrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.largeprice,
        MediumGramsPerOrder: parseInt("0"),
        MediumPrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.mediumprice,
        ProductName: this.registerForm.value.productname,
        Quantity: 1,
        Stock: parseInt("0"),
        UnitPrice: this.registerForm.value.category == 'Slushee' ? this.registerForm.value.unitprice : "0",
        Materials: this.arrayForMaterial
    };
    this.dbservice.postData('Products', specificObject)
    .then(async (successCreatingProduct) => 
    {
                    var loadingCtrl = await this.loadingCtrl.create({
                      message: 'Creating New Product',
                      spinner: 'bubbles',
                    });
                    await loadingCtrl.present();
                    await this.modal.dismiss();
                    var alertSuccess = await this.alertCtrl.create({
                      message: 'Product Created successfully',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel',
                        },
                      ],
                    });
                    setTimeout(async () => {
                      await loadingCtrl.dismiss();
                      await alertSuccess.present();
                    }, 4000);
                    this.registerForm.reset();
                    this.photoLink =
                      'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308';
                    this.hideInputFieldsforMilkteaAndFruitTea = true;
                    this.withPhoto = false;
    }).catch(async (err) => 
    {
          var errorAlert = await this.alertCtrl.create
          ({
            header: 'Error creating product',
            message: JSON.stringify(err),
            buttons: 
            [
              {
                text: 'Close',
                role: 'cancel'
              }
            ]
          })
          await errorAlert.present();
    })
            // var datetime = await moment(new Date()).format("MM-DD-YYYY hh:mm A")
            //   await this.afstore.collection('Products').add({
            //   Category: this.registerForm.value.category,
            //   GramsPerOrder: parseInt("0"),
            //   ImageUrl: this.photoLink,
            //   LargeGramsPerOrder: parseInt("0"),
            //   LargePrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.largeprice,
            //   MediumGramsPerOrder: parseInt("0"),
            //   MediumPrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.mediumprice,
            //   ProductName: this.registerForm.value.productname,
            //   Quantity: 1,
            //   Stock: parseInt("0"),
            //   UnitPrice: this.registerForm.value.category == 'Slushee' ? this.registerForm.value.unitprice : "0",
            //   Materials: this.arrayForMaterial
            // }).then(async el => {
            //   var loadingCtrl = await this.loadingCtrl.create
            //     ({
            //       message: 'Creating New Product',
            //       spinner: 'bubbles'
            //     })
            //     await loadingCtrl.present();
            //     await this.modal.dismiss();
            //     var alertSuccess = await this.alertCtrl.create
            //     ({
            //       message: 'Product Created successfully',
            //       buttons: [
            //         {
            //           text: 'Ok',
            //           role: 'cancel'
            //         }
            //       ]
            //     })
            //     setTimeout(async () => {
            //       await loadingCtrl.dismiss();
            //       await alertSuccess.present();
                  
            //     }, 4000);
            //    this.registerForm.reset()
            //   this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
            //   this.hideInputFieldsforMilkteaAndFruitTea = true
            //   this.withPhoto = false
            // }).catch(err => {
            //   alert(JSON.stringify(err))
            // })          
  }
  validation() 
  {
    var categoryvalidationiserror =  this.registerForm.controls['category'].invalid
    var productnamevalidationiserror =  this.registerForm.controls['productname'].invalid
    //var stockvalidationiserror =  this.registerForm.controls.stock.invalid
    var unitpricevalidationiserror =  this.registerForm.controls['unitprice'].invalid
    var mediumpricevalidationiserror =  this.registerForm.controls['mediumprice'].invalid
    var largepricevalidationiserror =  this.registerForm.controls['largeprice'].invalid
    //var gramsperordermediumvalidationiserror =  this.registerForm.controls.gramsperordermedium.invalid
    //var gramsperorderlargevalidationiserror =  this.registerForm.controls.gramsperorderlarge.invalid
    //var gramsperordervalidationiserror =  this.registerForm.controls.gramsperorder.invalid
    var materialvalidationiserror = this.registerForm.controls['materials'].invalid
    if (this.registerForm.value.category == '' || this.registerForm.value.category == null 
    || this.registerForm.value.category == undefined) 
    {
        this.errMsg = ''
        this.isValid = false
        this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
        this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
        //this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
        this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
        this.errMsg += unitpricevalidationiserror === true ? "• Unit Price<br>" : ""
        //this.errMsg += gramsperordervalidationiserror === true ? "• Grams Per Order<br>" : ""

    }
     else if (this.registerForm.value.category == 'Slushee')
    {
      if (categoryvalidationiserror === true || productnamevalidationiserror === true ||
         unitpricevalidationiserror === true || materialvalidationiserror === true 
         )
        {
          this.errMsg = ''
          this.isValid = false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
          //this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
          this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
          this.errMsg += unitpricevalidationiserror === true ? "• Unit Price<br>" : ""
          //this.errMsg += gramsperordervalidationiserror === true ? "• Grams Per Order<br>" : ""
        }
        else 
        {
          this.isValid =  true
          this.errMsg = ''
        }
    }
    else 
    {
      if (categoryvalidationiserror === true || productnamevalidationiserror === true 
        ||  mediumpricevalidationiserror === true
        || largepricevalidationiserror === true || materialvalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid = false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
          this.errMsg += materialvalidationiserror === true ? "• Materials<br>" : ""
          //this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
          this.errMsg += mediumpricevalidationiserror === true ? "• Medium Price<br>" : ""
          this.errMsg += largepricevalidationiserror === true ? "• Large Price<br>" : ""
          //this.errMsg += gramsperordermediumvalidationiserror === true ? "• Grams Per Order Medium<br>" : ""
          //this.errMsg += gramsperorderlargevalidationiserror === true ? "• Grams Per Order Large<br>" : ""
        }
        else 
        {
          this.isValid =  true
          this.errMsg = ''
        }
    }

this.validationMessageObject = {
  isValid: this.isValid,
  errMessage: this.errMsg
}
    return this.validationMessageObject
  }

  handleChange(event: any) {
    const category = event.target.value.toLowerCase();
    if (category.toLowerCase() == 'slushee') {
      this.hideInputFieldsforMilkteaAndFruitTea = true;
      this.registerForm.controls['productname'].setValue('');
      //this.registerForm.controls['stock'].setValue('');
      this.registerForm.controls['unitprice'].setValue('');
      this.registerForm.controls['mediumprice'].setValue('');
      this.registerForm.controls['largeprice'].setValue('');
      //this.registerForm.controls['gramsperordermedium'].setValue('');
      //this.registerForm.controls['gramsperorderlarge'].setValue('');
      //this.registerForm.controls['gramsperorder'].setValue('');
    } else {
      this.hideInputFieldsforMilkteaAndFruitTea = false;
      this.registerForm.controls['productname'].setValue('');
      //this.registerForm.controls['stock'].setValue('');
      this.registerForm.controls['unitprice'].setValue('');
      this.registerForm.controls['mediumprice'].setValue('');
      this.registerForm.controls['largeprice'].setValue('');
      //this.registerForm.controls['gramsperordermedium'].setValue('');
      //this.registerForm.controls['gramsperorderlarge'].setValue('');
      //this.registerForm.controls['gramsperorder'].setValue('');
    }
    
  }
  showMaterialsModal()
  {
    this.setMaterials();
    this.modal.present()
  }
  setMaterials()
      {
        this.arrayForMaterial = this.registerForm.value.materials
        //assigned object for material list string
        this.arrayForMaterial = this.arrayForMaterial.map((i, index) => {
          return Object.assign(
            {},
            {
              itemId: i,
              gramsperorderlarge : parseInt("0"),
              gramsperordermedium : parseInt("0"),
              gramsperorder :  parseInt("0"),   
            }
          );
        });
        //get the itemname of materials by using their uniqueidentifier ID
        this.arrayForMaterial.map((i, index) => 
        {
          this.dbservice.getDataById('Materials', i.itemId)
          .subscribe((data) => 
          {
            i.itemName = data.Itemname;
          })
        })
        // this.arrayForMaterial.map((i, index) => {
        //   this.materialEachElementReference = this.afstore.doc(
        //     `Materials/${i.itemId}`
        //   );
    
        //   this.materialEachElementReference
        //     .get()
        //     .pipe(
        //       map((actions) => {
        //         return actions.data() as any;
        //       })
        //     )
        //     .subscribe((data) => {
        //       i.itemName =  data.Itemname;
        //     });
       
            
        //   });
      }
      updateGramsPerOrderEvent(event: any, mat: any)
      {
        mat.gramsperorder = parseInt(event.target.value)
        this.validationForGramsPerOrder()
      }
      updateGramsPerOrderLargeEvent(event: any, mat: any)
      {
        mat.gramsperorderlarge = parseInt(event.target.value)
        this.validationForGramsPerOrder() 
      }
      updateGramsPerOrderMediumEvent(event: any, mat: any)
      {
        mat.gramsperordermedium = parseInt(event.target.value) 
        this.validationForGramsPerOrder()
      }
      validationForGramsPerOrder()
      {
        var filterNanValues;
      
        if (this.registerForm.value.category != 'Slushee')
        {
          filterNanValues = this.arrayForMaterial.filter(f =>  f.gramsperorderlarge == 0  || 
          f.gramsperordermedium == 0 || isNaN(parseInt(f.gramsperorderlarge))
          || isNaN(parseInt(f.gramsperordermedium)))
        }
        else 
        {
          filterNanValues = this.arrayForMaterial.filter
          (f => f.gramsperorder == 0 || isNaN(parseInt(f.gramsperorder)))
        }
          
          if (filterNanValues.length >= 1)
          {
            this.disableSaveChangesButton = true
          }
          else 
          {
            this.disableSaveChangesButton = false
          } 
      }
     
      close() {
        this.modal.dismiss()  
    }
    async savechanges()
    {  
    await this.saveFunction()
    }
}
