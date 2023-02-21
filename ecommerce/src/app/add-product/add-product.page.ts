import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AttrAst } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import * as moment from 'moment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  registerForm: FormGroup;
  photoLink: any;
  withPhoto: boolean = false;
  public isValid: boolean = false
  public errMsg: string = ''
  public validationMessageObject: object = {}
  public hideInputFieldsforMilkteaAndFruitTea: boolean = true 
  public productReference: AngularFirestoreCollection
  public sub;
  @ViewChild(IonInput) myInputVariable: IonInput;
  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afstore: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.photoLink =
      'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308';
    this.registerForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,
          msg: 'Always Starts With Capital Letter',
        }),
        this.customPatternValid({
          pattern: /^([^0-9]*)$/,
          msg: 'Numbers is not allowed',
        }),
      ]),
      productname: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          //pattern:  /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,
          pattern: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
          msg: 'Numbers or Special Characters are not allowed.',
        }),
      ]),
      stock: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        // this.customPatternValid({
        //   pattern: /^([^.?!.]*)$/,
        //   msg: 'Period is not allowed',
        // }),
      ]),
      unitprice: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
      ]),

      mediumprice: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!.]*)$/,
          msg: 'Period is not allowed',
        }),
      ]),
      largeprice: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!.]*)$/,
          msg: 'Period is not allowed',
        }),
      ]),
      gramsperordermedium: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!.]*)$/,
          msg: 'Period is not allowed',
        }),
      ]),
      gramsperorderlarge: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!.]*)$/,
          msg: 'Period is not allowed',
        }),
      ]),
      gramsperorder: new FormControl('', [
        Validators.required,
        this.customPatternValid({
          pattern: /^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,
          msg: 'This format is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!-]*)$/,
          msg: 'Negative is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!_]*)$/,
          msg: 'Under Score is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!=]*)$/,
          msg: 'Equal is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!+]*)$/,
          msg: 'Plus is not allowed',
        }),
        this.customPatternValid({
          pattern: /^([^.?!.]*)$/,
          msg: 'Period is not allowed',
        }),
      ]),
    });
  }
  customPatternValid(config: any): ValidatorFn {
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
  fileChanged(event) {
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
        var json = { events };
        for (var prop in json) {
          console.log('wew', json[prop].file);
          for (const variables of files) {
            this.photoLink = `https://ucarecdn.com/${json[prop].file}/${variables.name}`;
          }
        }
        this.withPhoto = true;
      });
  }
 async submit() {
  var isvalid =  Object.assign(this.validation()) 
  if (isvalid.isValid == false) 
        {
           var alertNotValid = await this.alertCtrl.create({
            header: 'This fields must be in the correct format',
            message: `<b>${isvalid.errMessage}</b>`,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel'
              }
            ]
           })
           await alertNotValid.present() 
        }
        else 
        {
          this.productReference = this.afstore.collection('Products')
          this.sub = this.productReference.get()
          .pipe(map(actions => {
            var tempdoc = actions.docs.map((doc) => {
              return {id: doc.id, ...doc.data() as any}
            })
            return tempdoc
          }))
          .subscribe(async data => {

            var existing = data.filter(f => f.Category == this.registerForm.value.category && f.ProductName.trimLeft() == this.registerForm.value.productname.trimLeft())
            if (existing.length > 0)
            {
                var alertExisting = await this.alertCtrl.create({
                  message: `${this.registerForm.value.productname} in the ${this.registerForm.value.category} category 
                  already exist.`,
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
                })
                await alertExisting.present()
            }
            else 
            {
              if (this.withPhoto == false) 
              {
                var alertNoPhoto = await this.alertCtrl.create
                ({
                  message: 'Please choose a photo',
                  buttons: 
                  [
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
                })
                await alertNoPhoto.present();
              } 
              else 
              {
                var loadingCtrl = await this.loadingCtrl.create
                ({
                  message: 'Creating New Product',
                  spinner: 'bubbles'
                })
                await loadingCtrl.present();
               
                var alertSuccess = await this.alertCtrl.create
                ({
                  message: 'Product Created successfully',
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel'
                    }
                  ]
                })
                setTimeout(async () => {
                  await loadingCtrl.dismiss();
                  await alertSuccess.present();
                  await this.saveFunction()
                }, 4000);
                      
              }
            }
          })
         
        }
  }

  async saveFunction() 
  {
            var datetime = await moment(new Date()).format("MM-DD-YYYY hh:mm A")
              await this.afstore.collection('Products').add({
              Category: this.registerForm.value.category,
              GramsPerOrder: this.registerForm.value.category == 'Slushee' ? parseInt(this.registerForm.value.gramsperorder) : parseInt("0"),
              ImageUrl: this.photoLink,
              LargeGramsPerOrder: this.registerForm.value.category == 'Slushee' ? parseInt("0") : parseInt(this.registerForm.value.gramsperorderlarge),
              LargePrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.largeprice,
              MediumGramsPerOrder: this.registerForm.value.category == 'Slushee' ? parseInt("0") : parseInt(this.registerForm.value.gramsperordermedium),
              MediumPrice: this.registerForm.value.category == 'Slushee' ? "0" : this.registerForm.value.mediumprice,
              ProductName: this.registerForm.value.productname,
              Quantity: 1,
              Stock: parseInt(this.registerForm.value.stock),
              UnitPrice: this.registerForm.value.category == 'Slushee' ? this.registerForm.value.unitprice : "0"
            }).then(async el => {
              await this.afstore.collection('Inventory').add({
                Datetime: datetime,
                Category: this.registerForm.value.category,
                ProductName: this.registerForm.value.productname,
                Quantity: parseInt(this.registerForm.value.stock),
                ImageUrl: this.photoLink,
                DatetimeToSort: new Date(),
                ProductId: el.id,
                Destination: 'Admin'
              })
               this.registerForm.reset()
              this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
              this.hideInputFieldsforMilkteaAndFruitTea = true
              this.withPhoto = false
            }).catch(err => {
              alert(JSON.stringify(err))
            })          
  }
  validation() 
  {
    var categoryvalidationiserror =  this.registerForm.controls.category.invalid
    var productnamevalidationiserror =  this.registerForm.controls.productname.invalid
    var stockvalidationiserror =  this.registerForm.controls.stock.invalid
    var unitpricevalidationiserror =  this.registerForm.controls.unitprice.invalid
    var mediumpricevalidationiserror =  this.registerForm.controls.mediumprice.invalid
    var largepricevalidationiserror =  this.registerForm.controls.largeprice.invalid
    var gramsperordermediumvalidationiserror =  this.registerForm.controls.gramsperordermedium.invalid
    var gramsperorderlargevalidationiserror =  this.registerForm.controls.gramsperorderlarge.invalid
    var gramsperordervalidationiserror =  this.registerForm.controls.gramsperorder.invalid
 
    if (this.registerForm.value.category == '' || this.registerForm.value.category == null 
    || this.registerForm.value.category == undefined) 
    {
        this.errMsg = ''
        this.isValid = false
        this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
        this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
        this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
        this.errMsg += unitpricevalidationiserror === true ? "• Unit Price<br>" : ""
        this.errMsg += gramsperordervalidationiserror === true ? "• Grams Per Order<br>" : ""

    }
    else if (this.registerForm.value.category == 'Slushee')
    {
      if (categoryvalidationiserror === true || productnamevalidationiserror === true ||
        stockvalidationiserror === true || unitpricevalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid = false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
          this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
          this.errMsg += unitpricevalidationiserror === true ? "• Unit Price<br>" : ""
          this.errMsg += gramsperordervalidationiserror === true ? "• Grams Per Order<br>" : ""
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
        || stockvalidationiserror === true || mediumpricevalidationiserror === true
        || largepricevalidationiserror === true || gramsperordermediumvalidationiserror === true
        || gramsperorderlargevalidationiserror === true)
        {
          this.errMsg = ''
          this.isValid = false
          this.errMsg += categoryvalidationiserror === true ? "• Category<br>" : ""
          this.errMsg += productnamevalidationiserror === true ? "• Product Name<br>" : ""
          this.errMsg += stockvalidationiserror === true ? "• Stock<br>" : ""
          this.errMsg += mediumpricevalidationiserror === true ? "• Medium Price<br>" : ""
          this.errMsg += largepricevalidationiserror === true ? "• Large Price<br>" : ""
          this.errMsg += gramsperordermediumvalidationiserror === true ? "• Grams Per Order Medium<br>" : ""
          this.errMsg += gramsperorderlargevalidationiserror === true ? "• Grams Per Order Large<br>" : ""
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

  handleChange(event) {
    const category = event.target.value.toLowerCase();
    if (category.toLowerCase() == 'slushee') {
      this.hideInputFieldsforMilkteaAndFruitTea = true;
      this.registerForm.controls['productname'].setValue('');
      this.registerForm.controls['stock'].setValue('');
      this.registerForm.controls['unitprice'].setValue('');
      this.registerForm.controls['mediumprice'].setValue('');
      this.registerForm.controls['largeprice'].setValue('');
      this.registerForm.controls['gramsperordermedium'].setValue('');
      this.registerForm.controls['gramsperorderlarge'].setValue('');
      this.registerForm.controls['gramsperorder'].setValue('');
    } else {
      this.hideInputFieldsforMilkteaAndFruitTea = false;
      this.registerForm.controls['productname'].setValue('');
      this.registerForm.controls['stock'].setValue('');
      this.registerForm.controls['unitprice'].setValue('');
      this.registerForm.controls['mediumprice'].setValue('');
      this.registerForm.controls['largeprice'].setValue('');
      this.registerForm.controls['gramsperordermedium'].setValue('');
      this.registerForm.controls['gramsperorderlarge'].setValue('');
      this.registerForm.controls['gramsperorder'].setValue('');
    }
    
  }

}
