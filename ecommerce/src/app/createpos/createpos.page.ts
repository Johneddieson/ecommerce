import { LocationStrategy } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { ApplicationRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-createpos',
  templateUrl: './createpos.page.html',
  styleUrls: ['./createpos.page.scss'],
})
export class CreateposPage implements OnInit {
  numbers = 0;
showLog = false
productReference: AngularFirestoreCollection
sub
productList: any[] = []
getCartDetails: any = []
cartItem:number = 0
@Input()title: string;
dropdown = false;
@ViewChild('productbtn', {read: ElementRef}) productbtn: ElementRef;
private unsubscriber : Subject<void> = new Subject<void>();
  constructor(private msg: MessengerService, private alertCtrl: AlertController, private auth: AuthServiceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    private actRoute: ActivatedRoute) {

      router.events.subscribe(() => {
        zone.run(() => {
          setTimeout(() => {
            this.applicationRef.tick()
            this.loadCart()
          }, 0)
        })
      })
    this.afauth.authState.subscribe(user => {

      if (user && user.uid) {
       this.actRoute.queryParams.subscribe(params => {
        if (params.category == undefined) {
          this.productReference =  afstore.collection('Products')
       
        } else {
          this.productReference =  afstore.collection('Products', ref => ref.where("Category", "==", params.category))
        }
        this.sub = this.productReference.snapshotChanges().pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
         }))).subscribe(data => {
          // data.forEach(fe => {
          //   this.afstore.doc(`Products/${fe.id}`).update({
          //     Stock: 20000
          //   })
          // })
          //data = data.filter(f => f.Stock > 0)
          data = data.sort(function(a, b) {
            if (a.ProductName < b.ProductName) {
              return -1
            }
            if (a.ProductName > b.ProductName) {
              return 1
            }
            return 0
          })
          this.productList = data
          
         }) 
       })  
      }
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
// history.pushState(null, null, location.href);
// this.locationStrategy.onPopState(() => {
//   history.pushState(null, null, location.href);
// })

var wew = sessionStorage.getItem('cart')
console.log(wew)
  }
loadCart() {
  if (sessionStorage.getItem('cart') != null) {
var thearray = []
    thearray.push(JSON.parse(sessionStorage.getItem('cart')))
    
   
    this.numbers = thearray[0].length;
  } else {
    this.numbers = 0
  } 
}
  Increase(data) {
    localStorage.removeItem('cart')
    data.Quantity +=1
  this.loadCart()
  }
  Decrease(data) {
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
    var cartValue = JSON.parse(sessionStorage.getItem('cart')) 
      this.cartItem = cartValue.length
    this.msg.cartSubject.next(this.cartItem)
  
  }
  checkout() {
  this.router.navigateByUrl('/admincheckout')
  }

  hideDropdown(event) {
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

      
//  async AddtoCart(dataProducts) 
//  {
//     if (dataProducts.Category != 'Slushee')
//     {
//       var alertMilkteaAndFruitTeaCategory = await this.alertCtrl.create({
//         header: 'Choose Size',
//         inputs: [
//           {
//             type:'radio',
//             label: 'Medium',
//             value: 'Medium',
//             name: 'Medium'
//           },
//           {
//             type:'radio',
//             label: 'Large',
//             value: 'Large',
//             name: 'Large'
//           },
//         ],
//         buttons: [
//           {
//             text: 'Add to cart',
//             handler: async (data) => {
//               var orderObject = {
//                 Category: dataProducts.Category,
//                 GramsPerOrder: data == 'Medium' ? dataProducts.MediumGramsPerOrder : dataProducts.LargeGramsPerOrder,
//                 ImageUrl: dataProducts.ImageUrl,
//                 LargeGramsPerOrder: dataProducts.LargeGramsPerOrder,
//                 LargePrice: dataProducts.LargePrice,
//                 MediumGramsPerOrder: dataProducts.MediumGramsPerOrder,
//                 MediumPrice: dataProducts.MediumPrice,
//                 ProductName: data == 'Medium' ? `${dataProducts.ProductName} Medium` : `${dataProducts.ProductName} Large`,
//                 Quantity: dataProducts.Quantity,
//                 Stock: dataProducts.Stock,
//                 UnitPrice: data == 'Medium' ?  dataProducts.MediumPrice : dataProducts.LargePrice,
//                 id: dataProducts.id
//               }
//               await this.addToCartFunction(orderObject)
//               dataProducts.Quantity = 1
//             }
//           },
//           {
//             text: 'Cancel',
//             role: 'cancel'
//           }
//         ]      
//       })
//       await alertMilkteaAndFruitTeaCategory.present();
//     }
//     else 
//     {
//       await this.addToCartFunction(dataProducts)
//     }
//  }


async AddtoCart(dataProducts) 
{
  if(dataProducts.Materials.length <=0)
 {
   alert("This product has no condiments. Please order it soon.")
 }
 else 
 {
  // dataProducts.Materials = dataProducts.Materials.map((i, index) => 
  // {
  //   return Object.assign({}, i, 
  //     {
  //       Quantity: dataProducts.Quantity
  //     })
  // })

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

 async addToCartFunction(data)
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
  } 
  else 
  {
    var id = data.id
    var productName = data.ProductName
    let index: number = -1

    this.itemsCart = JSON.parse(sessionStorage.getItem('cart'))
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
}
