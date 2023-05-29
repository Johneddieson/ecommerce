import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @Input()title!: string;
  dropdown = false;
  dropdownmobile = false;
  //istrue;
  iconName = "chevron-up"
  @ViewChild('productbtn', {read: ElementRef}) productbtn!: ElementRef;

products: any[] = []
//public category: string
  constructor(
    //private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router : Router,
    private alertCtrl: AlertController) 
    {
    // this.afauth.authState.subscribe(data => {
    //   if (data && data.uid) {
       
    //     this.actRoute.queryParams.subscribe(params => {
    //     if (params.category == undefined) {
    //       this.productCollection = this.afstore.collection('Products')
          
    //     } else  {
    //       this.productCollection = this.afstore.collection('Products', ref => ref.where("Category", "==", params.category))
            
    //     }
    //       this.sub = this.productCollection.snapshotChanges()
    //       .pipe(map(actions => actions.map(a => {
    //         return {
    //           id: a.payload.doc.id,
    //           ...a.payload.doc.data() as any
    //         }
    //       }))).subscribe(data => {
    //         console.log("Dab,", data)
    //          this.products = data
    //       })
    //     })
    //   }
    // })
   }

  ngOnInit() {
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
    
      categories() {
        this.dropdownmobile = true
    //  this.popover.create({
    //   component: CategoryPage,
    //   backdropDismiss: false
    // }).then(el => {
    //   el.present()
    // })
    
    this.alertCtrl.create({
      header: 'Choose Category',
      
      buttons: [
        {
          text: 'All',
          handler: (data) => {
          this.router.navigateByUrl('/dashboard')
          }
        },
        {
          text: 'Milktea',
          handler: (data) => {
            this.router.navigateByUrl('/dashboard?category=Milktea')
          }
        },
        {
          text: 'Fruit Tea',
          handler: (data) => {
            this.router.navigateByUrl('/dashboard?category=Fruit tea')
          }
        },
        {
          text: 'Slushee',
          handler: (data) => {
            this.router.navigateByUrl('/dashboard?category=Slushee')
          }
        }
      ]
    }).then(El => {
      El.present()
    })
    
        }
        async categoriesdown() {
          this.dropdownmobile = false
        }
    
}
