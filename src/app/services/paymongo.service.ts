import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymongoService {
  private readonly PAYMENT_BASE_URL = 'https://api.paymongo.com/v1/links';

  private readonly API_SECRET_KEY = 'sk_live_zoxppPPYnb62nj5ZrWQDwBUW';
  private secret = 'c2tfbGl2ZV9Dc3JCNDhjcUJWY3B3QmFoYVFYZWJkVno6'
  private readonly RETRIEVE_PAYMENT_LINK_URL = 'https://api.paymongo.com/v1/links'
  constructor(private http: HttpClient) { }

  createPaymentLink(amount: number, description: string, remarks: string): Observable<any> 
  {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(this.API_SECRET_KEY + ':')}`
    });
    const body = {
      data: {
        attributes: {
          amount,
          description,
          remarks
        }
      }
    };
    return this.http.post(this.PAYMENT_BASE_URL, body, { headers });
  }
  retrievePaymentLink(id: any)
  {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(this.API_SECRET_KEY + ':')}`
    });
    return this.http.get<any>(`${this.RETRIEVE_PAYMENT_LINK_URL}/${id}`, {headers})
  }
  archivePaymentLink(id: any)
  {
   // var apiLink = `https://api.paymongo.com/v1/links/${id}/archive`
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      //'Content-Type': 'application/json',
       'Authorization': `Basic ${btoa(this.API_SECRET_KEY + ':')}`
    });
    const body = 
    {
      id: id
    }
    return this.http.post(`${this.PAYMENT_BASE_URL}/${id}/archive`, body,  { headers });
  }

}
