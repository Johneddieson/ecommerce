import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sendsms } from 'src/app/interface/sendsms';

@Injectable({
  providedIn: 'root'
})
export class VonageapisendsmsService {

  constructor(private http: HttpClient) { }

sendSms(data: Sendsms)
{
  return this.http.post('http://localhost:3000/vonageapi/sendsms', data) as Observable<any>;
}

}
