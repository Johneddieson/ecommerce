import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sendemail } from 'src/app/interface/sendemail';

@Injectable({
  providedIn: 'root'
})
export class SendemailapiService {

  constructor(private http: HttpClient) { }

  sendEmailApi(data: Sendemail)
  {
    return this.http.post('http://localhost:3000/sendemailapi/sendemail', data) as Observable<any>;
  }
}
