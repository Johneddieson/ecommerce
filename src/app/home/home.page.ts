import { ApplicationRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { MessengerService } from '../messenger.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../services/dbservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
numbers = 0;
showLog = false
productList: any[] = []
getCartDetails: any = []
cartItem:number = 0
@Input()title!: string;
dropdown = false;
@ViewChild('productbtn', {read: ElementRef}) productbtn!: ElementRef;
@ViewChild(IonContent) content!: IonContent;
private unsubscriber : Subject<void> = new Subject<void>();
pendingorder: any
currentPage: number = 1;
testproducts: any[] = []
email: string = "";
public productLength: number = 0
public currentcategoryfilter: string = ""
constructor(private msg: MessengerService, 
    private alertCtrl: AlertController, 
    private locationStrategy: LocationStrategy,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private actRoute: ActivatedRoute,
    private dbservice: DbserviceService,
    private afauth: AngularFireAuth,
    private authservice: AuthserviceService
    ) 
    {

      this.afauth.authState.subscribe((user) => {
        if (user && user.uid)
        
        {
          this.dbservice.getDataById('users', user.uid)
          .subscribe((data) => 
          {
            var emailsplit = data.Email.split("@")
            this.email = emailsplit[0]
          })
        }

      })

      router.events.subscribe(() => {
        zone.run(() => {
          setTimeout(() => {
            this.applicationRef.tick()
            this.loadCart()
          }, 0)
        })
      })
      this.getProducts('')     
   }
   getProducts(category: any)
   {
      this.dbservice.getData('Products').subscribe(async (data) => 
      {
          data.map((i) => 
          {
            var imageConverted = i.ImageUrl.split("/")
            i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/400x400/`
            i.ImageForCheckout = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/130x130/`
          })

                  data = data.sort(function(a, b) {
                    if (a.ProductName < b.ProductName) {
                      return -1
                    }
                    if (a.ProductName > b.ProductName) {
                      return 1
                    }
                    return 0
                  })

                    if (category !== '')
                    {
                          data = data.filter(f => f.Category == category)
                          this.currentcategoryfilter = category.toUpperCase()
                    }
                    else 
                    {
                      this.currentcategoryfilter = "ALL"
                      data = data
                    }
                    
                    this.productList = data;        
      })
   
   }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(() => {
          this.applicationRef.tick()
          this.loadCart()
        }, 0)
      })
    })
  
}
  changePage(page: number): void
  {
    this.currentPage = page;
  }

loadCart() {
  if (sessionStorage.getItem('cart') != null) {
var thearray = []
    thearray.push(JSON.parse(sessionStorage.getItem('cart') as any))
    
   
    this.numbers = thearray[0].length;
  } else {
    this.numbers = 0
  } 
}
  Increase(data: any) {
    localStorage.removeItem('cart')
    data.Quantity +=1
  this.loadCart()
  }
  Decrease(data: any) {
    if (data.Quantity == 1) {
      this.alertCtrl.create({
        message: 'Quantity should not be zero',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      }).then(el => {
        el.present()
        this.loadCart()
      })
    } else {
      data.Quantity -= 1
this.loadCart()
    }
  }
  
  itemsCart: any = []
//   AddtoCart(data) {
//       if (data.Quantity > data.Stock) {
//         this.alertCtrl.create({
//           message: 'The quantity order should not be greater than the stock available',
//           buttons: [
//             {
//               text: 'Ok',
//               role: 'cancel'
//             }
//           ]
//         }).then(el => {
//           el.present()
//           data.Quantity = 1
//         })
//       } else {

      
//     var cartData = sessionStorage.getItem('cart')
//     if (cartData == null) {
//       var theid = data.id
//       let index: number = -1
//       let storageDataGet: any = []
//         storageDataGet.push(data)
//         sessionStorage.setItem('cart', JSON.stringify(storageDataGet)) 
       
//         data.Quantity = 1
//     } else {
//       var id = data.id
//       let index: number = -1

//       this.itemsCart = JSON.parse(sessionStorage.getItem('cart'))
//       for (let i= 0; i<this.itemsCart.length; i++) {
//         if (id == this.itemsCart[i].id) {
//           this.itemsCart[i].Quantity = data.Quantity
//           data.Quantity = 1
//           index = i;
//           break;
//         }
//       }
    
//       if (index == -1) {
//           this.itemsCart.push(data)
          
//           sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
          
//           data.Quantity = 1
//       } else {
//         sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
       
//         data.Quantity = 1
//       }
//     this.cartItemFunc()
   
//     }
//     this.loadCart()
//   }
// }
  cartItemFunc() {
    var cartValue = JSON.parse(sessionStorage.getItem('cart') as any) 
      this.cartItem = cartValue.length
    this.msg.cartSubject.next(this.cartItem)
  
  }
  checkout() {
  this.router.navigateByUrl('/checkout')
  }

  hideDropdown(event: any) 
  {
    const xTouch = (event.clientX)
    const yTouch = (event.clientY)
    
    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top+2
    const leftBoundary = rec.left+2
    const rightBoundary = rec.right-2
    
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false
    }
    
      }
  async AddtoCart(dataProducts: any) 
 {
  // if (this.pendingorder == true)
  // {
  //   alert("You cannot order while you have a pending order.")
  // }
   if(dataProducts.Materials.length <=0)
  {
    alert("This product has no condiments. Please order it soon.")
  }
  else 
  {
    dataProducts.Materials = dataProducts.Materials.map((i: any, index: any) => 
  {
    return Object.assign({}, i, 
      {
        Quantity: dataProducts.Quantity
      })
  })
  
    if (dataProducts.Category != 'Slushee')
    {
      var alertMilkteaAndFruitTeaCategory = await this.alertCtrl.create({
        header: 'Choose Size',
        inputs: [
          {
            type:'radio',
            label: 'Medium',
            value: 'Medium',
            name: 'Medium'
          },
          {
            type:'radio',
            label: 'Large',
            value: 'Large',
            name: 'Large'
          },
        ],
        buttons: [
          {
            text: 'Add to cart',
            handler: async (data) => {
              var orderObject = {
                Category: dataProducts.Category,
                GramsPerOrder: data == 'Medium' ? dataProducts.MediumGramsPerOrder : dataProducts.LargeGramsPerOrder,
                ImageUrl: dataProducts.ImageUrl,
                ImageConverted: dataProducts.ImageConverted,
                ImageForCheckout: dataProducts.ImageForCheckout,  
                LargeGramsPerOrder: dataProducts.LargeGramsPerOrder,
                LargePrice: dataProducts.LargePrice,
                MediumGramsPerOrder: dataProducts.MediumGramsPerOrder,
                MediumPrice: dataProducts.MediumPrice,
                ProductName: data == 'Medium' ? `${dataProducts.ProductName} Medium` : `${dataProducts.ProductName} Large`,
                Quantity: dataProducts.Quantity,
                Stock: dataProducts.Stock,
                UnitPrice: data == 'Medium' ?  dataProducts.MediumPrice : dataProducts.LargePrice,
                id: dataProducts.id,
                Materials: dataProducts.Materials
              }
              await this.addToCartFunction(orderObject)
              dataProducts.Quantity = 1
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]      
      })
      await alertMilkteaAndFruitTeaCategory.present();
    }
    else 
    {
      await this.addToCartFunction(dataProducts)
    }
  }
 }

 async addToCartFunction(data: any)
 {
  //alert(data.Quantity)
  var cartData = sessionStorage.getItem('cart')
  if (cartData == null) {
    var theid = data.id
    let index: number = -1
    let storageDataGet: any = []
      storageDataGet.push(data)
      sessionStorage.setItem('cart', JSON.stringify(storageDataGet)) 
     
      //data.Quantity = 1
  } else {
    var id = data.id
    var productName = data.ProductName
    let index: number = -1

    this.itemsCart = JSON.parse(sessionStorage.getItem('cart') as any)
    for (let i= 0; i<this.itemsCart.length; i++) {
      if (id == this.itemsCart[i].id && productName == this.itemsCart[i].ProductName) {
        this.itemsCart[i].Quantity = data.Quantity
        //data.Quantity = 1
        index = i;
        break;
      }
    }
  
    if (index == -1) {
        this.itemsCart.push(data)
        
        sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
        
        //data.Quantity = 1
    } else {
      sessionStorage.setItem('cart', JSON.stringify(this.itemsCart))
     
      //data.Quantity = 1
    }
  this.cartItemFunc()
 
  }
  this.loadCart()
  data.Quantity = 1 
}
async queryProducts(params: any)
{
  console.log("params", params)
  this.productList = this.productList.filter(f => f.Category == params);
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

      checkIfExisting(data: any)
      {
        var  cart = JSON.parse(sessionStorage.getItem('cart') as any)
         
        if (cart == undefined || cart == null || cart.length == 0)
        {
          return false
        }
        else 
        {
          var existinglength;  
            if(data.Category == 'Slushee')
            {
             existinglength = cart.filter((f: any) => f.id == data.id && f.ProductName == data.ProductName)
            }
            else 
            {
              existinglength = cart.filter((f: any) => (f.id == data.id && f.ProductName == data.ProductName + " Medium") ||
              (f.id == data.id && f.ProductName == data.ProductName + " Large"))
            }
          return existinglength.length <= 0 ? false : true
        }
      
      }

      logout()
      {
        this.authservice.SignOut()
      }


      async searchcategory()
      {
        var alertSearchRadioButton = await this.alertCtrl.create
        ({
          header: 'Select category',
          backdropDismiss: false,
          inputs: 
          [
            {
              name: 'Show All',
              label: 'Show All',
              type: 'radio',
              value: ''
            },
            {
              name: 'Milktea',
              label: 'Milktea',
              type: 'radio',
              value: 'Milktea'
            },
            {
              name: 'Fruit tea',
              label: 'Fruit tea',
              type: 'radio',
              value: 'Fruit tea'
            },
            {
              name: 'Slushee',
              label: 'Slushee',
              type: 'radio',
              value: 'Slushee'
            },
          ],
          buttons: 
          [
            {
              text: 'Search',
              handler: ((data) => 
              {
                 // console.log("the data filter", data)
                  this.getProducts(data)
              })
            },
            {
              text: 'Close',
              role: 'cancel'
            }
          ]
        })

        await alertSearchRadioButton.present();

      }
}
