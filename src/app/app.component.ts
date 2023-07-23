import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { environment } from 'src/environments/environment';
import { DbserviceService } from './services/dbservice.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dbservice: DbserviceService) 
  {
    // this.dbservice.getData('Products')
    // .subscribe((data) => 
    // {
    //   data.forEach(fe => 
    //     {
    //       var specific = 
    //       {
    //         Materials: []
    //       }
    //       this.dbservice.updateData(fe.id, specific, 'Products').then(() => 
    //       {
    //         console.log("materials updated")
    //       })
    //     })
    // })
  }

ngOnInit(): void {
}
}
