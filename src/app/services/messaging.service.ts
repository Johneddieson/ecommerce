import { Injectable } from '@angular/core';
import { getToken, getMessaging,  } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {
currentMessage = new BehaviorSubject(null);
constructor
(
) 

{
//   this.angularFireMessaging.messages.subscribe(
// (_messaging) => {
//   _messaging
// _messaging.onMessage = _messaging.onMessage.bind(_messaging);
// _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
// }
// )
}
requestPermission() 
{
 
}
receiveMessage() {
}
}