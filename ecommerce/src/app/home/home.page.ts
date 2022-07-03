import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthServiceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth) {

    this.afauth.authState.subscribe(user => {

      if (user && user.uid) {

      
      }
    })
   }

  ngOnInit() {
  }

}
