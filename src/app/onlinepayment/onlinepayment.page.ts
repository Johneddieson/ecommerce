import { map } from 'rxjs/operators';
import { DbserviceService } from './../services/dbservice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-onlinepayment',
  templateUrl: './onlinepayment.page.html',
  styleUrls: ['./onlinepayment.page.scss'],
})
export class OnlinepaymentPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
mycurrentonlinepaymentorder: any[] = []
public emailsplit: any;
  constructor(
    private afauth : AngularFireAuth,
    private dbservice : DbserviceService,
    private paymongoservice: PaymongoService,
    private currencyPipe: CurrencyPipe,
    private authservice: AuthserviceService
  ) 
  { 
    this.afauth.authState.subscribe((user) => 
    {
      if (user && user.uid)
      {
        var emailsplit = user.email?.split("@") as any;
        this.emailsplit = emailsplit[0]
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

  onScroll(event: any)
    {
      //console.log("Wew", event.detail.scrollTop)
      if (event.detail.scrollTop > 300)
      {
        $('.sticky-top').addClass('shadow-sm').css('top', '0px');
      }
      else 
      {
        $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
      }
    }

    backtoTop()
    {
      this.content.scrollToTop(400);
    }
    logout()
      {
        this.authservice.SignOut()
      }

}
