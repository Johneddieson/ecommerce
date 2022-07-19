import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-createpos',
  templateUrl: './createpos.page.html',
  styleUrls: ['./createpos.page.scss'],
})
export class CreateposPage implements OnInit {
  registerForm: FormGroup;
  photoLink: any
  withPhoto: boolean = false
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController,) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {

      }
    })
   }

  ngOnInit() {
    this.photoLink = 'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308'
    this.registerForm = new FormGroup({
      
      firstname: new FormControl('', [
        Validators.required,
        this.customPatternValid({ pattern: /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/, msg: "Always Starts With Capital Letter"}),
        this.customPatternValid({ pattern: /^([^0-9]*)$/, msg: 'Numbers is not allowed' }),
        //Validators.minLength(5),
        // Validators.maxLength(10),
      ])
    })
  }

  customPatternValid(config: any): ValidatorFn {
    console.log("wew", config)
    return (control: FormControl) => {
      let urlRegeX: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegeX)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null
      }
    }
      }

}
