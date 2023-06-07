import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  cartSubject = new Subject<any>()

  time = new Subject<any>()
  constructor(private http: HttpClient) { }


  myLoc(lat: any, lng: any)
  {
    //console.log("lat", lat)
    //console.log("lng", lng)
    return this.http.get<any>(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=nJevYldhmdN6UJ1UTU6k&app_code=mwbyllLVSo4bCu1hA2Et-g&mode=retrieveAddresses&prox=${lat},${lng}`)
  }
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
