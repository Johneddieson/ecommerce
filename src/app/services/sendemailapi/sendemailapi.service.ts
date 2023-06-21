import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sendemail } from 'src/app/interface/sendemail';

@Injectable({
  providedIn: 'root'
})
export class SendemailapiService {
public sendEmailAPI: string = 'https://dmixologistsendemailapi.onrender.com/sendemailapi/sendemail'
  constructor(private http: HttpClient) { }

  sendEmailApi(data: Sendemail)
  {
    return this.http.post(`${this.sendEmailAPI}`, data) as Observable<any>;
  }
}
