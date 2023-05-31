import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private afauth: AngularFireAuth) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user') as any);
    return (user !== null) ? true : false;
  }
  SignOut()
  {
    this.afauth.signOut();
  }
}
