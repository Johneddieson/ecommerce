import { Xtb } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

@Input()title: string;
dropdown = false;
@ViewChild('productbtn', {read: ElementRef}) productbtn: ElementRef;
  constructor() { }

  ngOnInit() {}
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

}
