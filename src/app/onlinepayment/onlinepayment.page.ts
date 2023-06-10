import { map } from 'rxjs/operators';
import { DbserviceService } from './../services/dbservice.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-onlinepayment',
  templateUrl: './onlinepayment.page.html',
  styleUrls: ['./onlinepayment.page.scss'],
})
export class OnlinepaymentPage implements OnInit {
mycurrentonlinepaymentorder: any[] = []
  constructor(
    private afauth : AngularFireAuth,
    private dbservice : DbserviceService,
    private paymongoservice: PaymongoService,
    private currencyPipe: CurrencyPipe,
  ) 
  { 
    this.afauth.authState.subscribe((user) => 
    {
      if (user && user.uid)
      {
          this.getcurrentuserallorders(user.uid);
      }
    })

  }
  getcurrentuserallorders(uid: any)
  {
      this.dbservice.getData('Orders').subscribe((data) => 
      {
        var currentuserorder = data.filter((f) => f.BillingIndexId == uid && f.PaymentMethod != 'Cash');
      
        currentuserorder = currentuserorder.sort((a: any, b: any) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort))
        currentuserorder.map((e) => 
        {
          setInterval(() => 
          {
            this.paymongoservice.retrievePaymentLink(e.paymentReference).subscribe((paymentapidata) => 
          {
              e.paymentStatus = paymentapidata.data.attributes.status
              //console.log("current user online order", paymentapidata.data);
              e.paymentUrl = paymentapidata.data.attributes.checkout_url
            })
          }, 300)
          e.OrderDate = moment(moment(e.Datetime).toDate()).format('MMMM DD, YYYY');
        })
        this.mycurrentonlinepaymentorder = currentuserorder;
      })
  }

  ngOnInit() 
  {

  }
  parseUnitPrice(UnitPrice: any)
  {
      return parseFloat(UnitPrice);
  }

}
