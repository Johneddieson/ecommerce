import { Xtb } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CategoryPage } from 'src/app/category/category.page';
import { DashboardPage } from 'src/app/dashboard/dashboard.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

@Input()title!: string;
dropdown = false;
dropdownmobile = false;
istrue: any;
iconName = "chevron-up"
@ViewChild('productbtn', {read: ElementRef}) productbtn!: ElementRef;
  constructor(private popover: PopoverController, private alertCtrl: AlertController,
    private router :Router) { }

  ngOnInit() {}
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
      this.router.navigateByUrl('/tabs/product')
      }
    },
    {
      text: 'Milktea',
      handler: (data) => {
        this.router.navigateByUrl('/tabs/product?category=Milktea')
      }
    },
    {
      text: 'Fruit Tea',
      handler: (data) => {
        this.router.navigateByUrl('/tabs/product?category=Fruit tea')
      }
    },
    {
      text: 'Slushee',
      handler: (data) => {
        this.router.navigateByUrl('/tabs/product?category=Slushee')
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
