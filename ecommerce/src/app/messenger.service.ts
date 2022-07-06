import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  cartSubject = new Subject<any>()

  time = new Subject<any>()
  constructor() { }
}
