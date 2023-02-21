import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, IonInput } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  public id: string;
  registerForm: FormGroup;
  photoLink: any;
  withPhoto: boolean = false;
  productname;
  stock;
  price;
  currentstock;
  category;
  mediumprice;
  largeprice;
  gramsperordermedium;
  gramsperorderlarge;
  gramsperorder;
  public disabledCategoryField: boolean = true;
  public isValid: boolean = false;
  public errMsg: string = '';
  public validationMessageObject: object = {};
  p;
  @ViewChild(IonInput) myInputVariable: IonInput;
  productReference: AngularFirestoreDocument;
  sub;
  isdisabled: boolean = false;
  constructor(
    private actRoute: ActivatedRoute,
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private afstore: AngularFirestore
  ) {
    this.id = actRoute.snapshot.paramMap.get('id');

    this.productReference = this.afstore.doc(`Products/${this.id}`);
    this.sub = this.productReference.valueChanges().subscribe((data) => {
      this.productname = data.ProductName;
      this.stock = data.Stock.toString();
      this.price = data.UnitPrice;
      this.photoLink = data.ImageUrl;
      this.withPhoto = true;
      this.currentstock = data.Stock.toString();
      this.category = data.Category;
      this.mediumprice = data.MediumPrice;
      this.largeprice = data.LargePrice;
      this.gramsperordermedium = data.MediumGramsPerOrder;
      this.gramsperorderlarge = data.LargeGramsPerOrder;
      this.gramsperorder = data.GramsPerOrder;
    });
  }

  ngOnInit() {
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

    //this for my github account 760e7038539ea9dd5176
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
  //   submit() {
  //     this.loadingCtrl.create({
  //       message: 'Updating Product'
  //     }).then(el => {
  //       el.present()
  //       setTimeout(() => {
  //         el.dismiss()
  //         this.alertCtrl.create({
  //           header: 'Officially Updated',
  //           message: 'You updated the product successfully',
  //           buttons: [
  //             {
  //               text: 'Ok',
  //               role: 'cancel'
  //             }
  //           ]
  //         }).then(els => {
  //           els.present()
  //         }).catch(err => {

  //         })
  //       }, 3000)

  //     }).catch(err => {

  //     })
  //     var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")

  //     if(parseInt(this.registerForm.value.cellphonenumber) == parseInt(this.currentstock)) {
  //         this.productReference.update({
  //          Stock: parseInt(this.registerForm.value.cellphonenumber),
  //          UnitPrice: this.registerForm.value.password,
  //          ImageUrl: this.photoLink,

  //         })
  //     } else {
  //       if (parseInt(this.registerForm.value.cellphonenumber) > parseInt(this.currentstock)) {
  // var totalstocks = parseInt(this.registerForm.value.cellphonenumber) - parseInt(this.currentstock)

  //         this.productReference.update({
  //           Stock: parseInt(this.registerForm.value.cellphonenumber),
  //           UnitPrice: this.registerForm.value.password,
  //           ImageUrl: this.photoLink,

  //          })
  //               this.afstore.collection('Inventory').add({
  //         Quantity: totalstocks *  1,
  //         Datetime: datetime,
  //         read: false,
  //         Destination: "Admin",
  //         ProductName: this.registerForm.value.firstname,
  //         UnitPrice: this.registerForm.value.password,
  //         ImageUrl: this.photoLink,
  //         DatetimeToSort: new Date()
  //       })
  //       } else {
  //         var totalstocks2 = parseInt(this.currentstock) - parseInt(this.registerForm.value.cellphonenumber)
  //         this.productReference.update({
  //           Stock: parseInt(this.registerForm.value.cellphonenumber),
  //           UnitPrice: this.registerForm.value.password,
  //           ImageUrl: this.photoLink,

  //          })
  //               this.afstore.collection('Inventory').add({
  //         Quantity: totalstocks2 *  -1,
  //         Datetime: datetime,
  //         read: false,
  //         Destination: "Admin",
  //         ProductName: this.registerForm.value.firstname,
  //         UnitPrice: this.registerForm.value.password,
  //         ImageUrl: this.photoLink,
  //         DatetimeToSort: new Date()
  //       })
  //       }
  //     }

  //   //   if (this.withPhoto == false) {
  //   //       this.alertCtrl.create({
  //   //         message: 'Please Choose a Photo',
  //   //         buttons: [
  //   //         {
  //   //           text: 'Ok',
  //   //           role: 'cancel'
  //   //         }
  //   //         ]
  //   //       }).then(els2 => {
  //   //         els2.present()
  //   //       })
  //   //   } else {

  //   //   this.loadingCtrl.create({
  //   //     message: 'Creating New Product'
  //   //   }).then(el => {
  //   //     el.present()

  //   //     this.afstore.collection('Products').add({
  //   //       ProductName: this.registerForm.value.firstname,
  //   //       Stock: parseInt(this.registerForm.value.cellphonenumber),
  //   //       UnitPrice: this.registerForm.value.password,
  //   //       ImageUrl: this.photoLink,
  //   //       Quantity: 1
  //   //     })
  //   //     var datetime = moment(new Date()).format("DD-MM-YYYY hh:mm A")
  //   //     this.afstore.collection('Inventory').add({
  //   //       Quantity: parseInt(this.registerForm.value.cellphonenumber) *  1,
  //   //       Datetime: datetime,
  //   //       read: false,
  //   //       Destination: "Admin",
  //   //       ProductName: this.registerForm.value.firstname,
  //   //       UnitPrice: this.registerForm.value.password,
  //   //       ImageUrl: this.photoLink
  //   //     })

  //   //     setTimeout(() => {
  //   //       el.dismiss()
  //   //       this.registerForm.reset()
  //   //       //this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
  //   //       this.alertCtrl.create({
  //   //         header: 'Officially Created',
  //   //         message: 'You created the product successfully',
  //   //         buttons: [
  //   //           {
  //   //             text: 'Ok',
  //   //             role: 'cancel'
  //   //           }
  //   //         ]
  //   //       }).then(els => {
  //   //         els.present()
  //   //         this.myInputVariable.value = "";
  //   //       }).catch(err => {

  //   //       })
  //   //     }, 3000)

  //   //   }).catch(err => {

  //   //   })
  //   // }
  //   }

  async submit() {
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
      var loadingForUpdatingProduct = await this.loadingCtrl.create({
        message: 'Updating product...',
        spinner: 'bubbles',
      });

      await loadingForUpdatingProduct.present();

      var alertForUpdatingProduct = await this.alertCtrl.create({
        message: 'You updated this product successfully!',
        buttons: [
          {
            role: 'cancel',
            text: 'Ok'
          }
        ]
      })
      setTimeout(async () => {
        await loadingForUpdatingProduct.dismiss()
        await alertForUpdatingProduct.present()
        await this.editFunction()
      }, 4000);
    }
  }
  async editFunction() {
    
    var StockChanges = parseInt(this.currentstock) == parseInt(this.registerForm.value.stock)
    var datetime = await moment(new Date()).format('MM-DD-YYYY hh:mm A');
    await this.productReference
      .update({
        //Category: this.registerForm.value.category,
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
      })
      
      if (StockChanges == false) {
        await this.afstore.collection('Inventory').add({
          Datetime: datetime,
          Category: this.registerForm.value.category,
          ProductName: this.registerForm.value.productname,
          Quantity: parseInt(this.registerForm.value.stock),
          ImageUrl: this.photoLink,
          DatetimeToSort: new Date(),
          ProductId: this.id,
          Destination: 'Admin'
        });
      }
  }

  validation() {
    var categoryvalidationiserror = this.registerForm.controls.category.invalid;
    var productnamevalidationiserror =
      this.registerForm.controls.productname.invalid;
    var stockvalidationiserror = this.registerForm.controls.stock.invalid;
    var unitpricevalidationiserror =
      this.registerForm.controls.unitprice.invalid;
    var mediumpricevalidationiserror =
      this.registerForm.controls.mediumprice.invalid;
    var largepricevalidationiserror =
      this.registerForm.controls.largeprice.invalid;
    var gramsperordermediumvalidationiserror =
      this.registerForm.controls.gramsperordermedium.invalid;
    var gramsperorderlargevalidationiserror =
      this.registerForm.controls.gramsperorderlarge.invalid;
    var gramsperordervalidationiserror =
      this.registerForm.controls.gramsperorder.invalid;

    if (
      this.registerForm.value.category == '' ||
      this.registerForm.value.category == null ||
      this.registerForm.value.category == undefined
    ) {
      this.errMsg = '';
      this.isValid = false;
      this.errMsg += categoryvalidationiserror === true ? '• Category<br>' : '';
      this.errMsg +=
        productnamevalidationiserror === true ? '• Product Name<br>' : '';
      this.errMsg += stockvalidationiserror === true ? '• Stock<br>' : '';
      this.errMsg +=
        unitpricevalidationiserror === true ? '• Unit Price<br>' : '';
      this.errMsg +=
        gramsperordervalidationiserror === true ? '• Grams Per Order<br>' : '';
    } else if (this.registerForm.value.category == 'Slushee') {
      if (
        categoryvalidationiserror === true ||
        productnamevalidationiserror === true ||
        stockvalidationiserror === true ||
        unitpricevalidationiserror === true
      ) {
        this.errMsg = '';
        this.isValid = false;
        this.errMsg +=
          categoryvalidationiserror === true ? '• Category<br>' : '';
        this.errMsg +=
          productnamevalidationiserror === true ? '• Product Name<br>' : '';
        this.errMsg += stockvalidationiserror === true ? '• Stock<br>' : '';
        this.errMsg +=
          unitpricevalidationiserror === true ? '• Unit Price<br>' : '';
        this.errMsg +=
          gramsperordervalidationiserror === true
            ? '• Grams Per Order<br>'
            : '';
      } else {
        this.isValid = true;
        this.errMsg = '';
      }
    } else {
      if (
        categoryvalidationiserror === true ||
        productnamevalidationiserror === true ||
        stockvalidationiserror === true ||
        mediumpricevalidationiserror === true ||
        largepricevalidationiserror === true ||
        gramsperordermediumvalidationiserror === true ||
        gramsperorderlargevalidationiserror === true
      ) {
        this.errMsg = '';
        this.isValid = false;
        this.errMsg +=
          categoryvalidationiserror === true ? '• Category<br>' : '';
        this.errMsg +=
          productnamevalidationiserror === true ? '• Product Name<br>' : '';
        this.errMsg += stockvalidationiserror === true ? '• Stock<br>' : '';
        this.errMsg +=
          mediumpricevalidationiserror === true ? '• Medium Price<br>' : '';
        this.errMsg +=
          largepricevalidationiserror === true ? '• Large Price<br>' : '';
        this.errMsg +=
          gramsperordermediumvalidationiserror === true
            ? '• Grams Per Order Medium<br>'
            : '';
        this.errMsg +=
          gramsperorderlargevalidationiserror === true
            ? '• Grams Per Order Large<br>'
            : '';
      } else {
        this.isValid = true;
        this.errMsg = '';
      }
    }

    this.validationMessageObject = {
      isValid: this.isValid,
      errMessage: this.errMsg,
    };
    return this.validationMessageObject;
  }
}
