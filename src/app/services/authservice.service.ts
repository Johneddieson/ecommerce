import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor
  (
    private afauth: AngularFireAuth,
    private router: Router
    ) 
     {

     }

  get isLoggedIn(): boolean 
  {
    const user = JSON.parse(sessionStorage.getItem('user') as any);
    return (user !== null) ? true : false;
  }
  SignOut()
  {
    this.afauth.signOut();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('cart');
    this.router.navigateByUrl('/mainpage')
  }
}
