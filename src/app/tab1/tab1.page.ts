import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
menuItems = [
  {
    title: 'Home',
    icon: 'home',
    path: '/tabs/tab1'
  },
  {
    title: 'Categories',
    icon: 'list',
    path: ''
  },
  {
    title: 'About',
    icon: 'information',
    path: ''
  }
]
  constructor(private menuCtrl: MenuController) {}

  ngOnInit(): void {
      
  }
  setTitle(title: any) {
    
  }
}
