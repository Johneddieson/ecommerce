import { Component, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  // @Output() istrue = new EventEmitter();
 // @Output() istrue = new EventEmitter<string>();

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  popoverdismiss() {
var pops =  this.popover.dismiss()
console.log("the pops page", pops)
}

}
