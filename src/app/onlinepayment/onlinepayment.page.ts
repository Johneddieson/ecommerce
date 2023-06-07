import { DbserviceService } from './../services/dbservice.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';

@Component({
  selector: 'app-onlinepayment',
  templateUrl: './onlinepayment.page.html',
  styleUrls: ['./onlinepayment.page.scss'],
})
export class OnlinepaymentPage implements OnInit {

  constructor(
    private afauth : AngularFireAuth,
    private dbservice : DbserviceService,
    private paymongoservice: PaymongoService
  ) 
  { 


  }
  getcurrentuserorderonlinepayment()
  {
    
  }

  ngOnInit() {

  }

}
