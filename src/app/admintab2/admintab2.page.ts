import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaymongoService } from '../services/paymongo.service';
@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page implements OnInit {
  allPendingOrders: any[] = []
  startDateFilter: string = ''
  endDateFilter: string = ''
  customeremail: string = ''
  customerfullname: string = ''
  paymentstatus: string = ''
  
  @ViewChild(IonModal) modal!: IonModal;
 
  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private dbservice: DbserviceService,
    private alertCtrl: AlertController,
    private paymongoservice: PaymongoService
    ) 
    {
      this.afauth.authState.subscribe((data: any) => {
        if (data.uid) 
        {
          this.getHistory()
        }
      });
    }

    getHistory()
    {
      this.dbservice.getData('History').subscribe((dataHistory) => {
        dataHistory.map((i, index) => {
          if (i.PaymentMethod != 'Cash') {
            i.paymentLink = `https://pm.link/Dmixologist/${i.paymentReference}`;
            setInterval(() => {
              this.paymongoservice
                .retrievePaymentLink(i.paymentReference)
                .subscribe((paymentretrieve) => {
                  i.paymentStatus = paymentretrieve.data.attributes.status;
                });
            }, 300);
          } 
          else 
          {
            i.paymentStatus = 'paid';
            i.paymentLink = 'COD';
          }
        });

        dataHistory = dataHistory.sort(
          (a, b) => Number(b.DatetimeToSort) - Number(a.DatetimeToSort)
        );
        if (this.startDateFilter != '' && this.endDateFilter != '')
        {
          dataHistory = dataHistory.filter(f => 
            moment(f.Datetime).toDate() >= moment(this.startDateFilter + " 00:00").toDate()
            && moment(f.Datetime).toDate() <= moment(this.endDateFilter + " 23:59").toDate()
            
            )
        }
        if (this.customeremail != '')
        {
          dataHistory = dataHistory.filter(f => f.Billingemail.toLowerCase().includes(this.customeremail));
        }
        if (this.customerfullname != '')
        {
          dataHistory = dataHistory.filter((f) => 
          `${f.BillingFirstname} ${f.BillingLastname}`.toLowerCase()
          .includes(this.customerfullname)
          )
        }
        
        this.allPendingOrders = dataHistory;
      });
    }

  ngOnInit() {
  }
  startdateFilter($event: any)
  {

  }

  addproduct() {
    this.alertCtrl
      .create({
        header: 'Choose',
        inputs: [
          {
            type: 'radio',
            label: 'Add Material',
            value: 'Add Material',
          },
          {
            type: 'radio',
            label: 'Add Product',
            value: 'Add Product',
          },
          {
            type: 'radio',
            label: 'POS',
            value: 'POS',
          },
          {
            type: 'radio',
            label: 'View Materials',
            value: 'View Materials',
          },
          {
            type: 'radio',
            label: 'View Products',
            value: 'View Products',
          },
        ],
        buttons: [
          {
            text: 'Go',
            handler: (data) => {
              if (data == 'View Products') {
                this.router.navigateByUrl('/viewproducts');
              } 
              else if (data == 'Add Material') {
                this.router.navigateByUrl('/addmaterial');
              }
              else if (data == 'Add Product') {
                this.router.navigateByUrl('/add-product');
              }
              else if (data == 'View Materials') {
                this.router.navigateByUrl('/viewmaterials');
              }
              else if (data == 'POS') {
                this.router.navigateByUrl('/createpos');
              } 
              // else if (data == 'Inventory') {
              //   this.router.navigateByUrl('/inventory');
              // }
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((el) => {
        el.present();
      });
  }

  openFilterModal()
  {
    this.modal.present();
  }
  closeFilterModal()
  {
    this.modal.dismiss();
  }
  searchHistory()
  {
      this.getHistory();
      this.closeFilterModal();
  }
}
