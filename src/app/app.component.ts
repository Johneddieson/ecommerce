import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() 
  {
    
    
  }

ngOnInit(): void {
}
}
