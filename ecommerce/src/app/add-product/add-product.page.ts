import { HttpClient } from '@angular/common/http';
import { AttrAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
photoLink: any
  constructor(public http: HttpClient) { }

  ngOnInit() {
  }
  fileChanged(event) {
    const files = event.target.files
    console.log("the files", files)
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_PUB_KEY', '760e7038539ea9dd5176')
    this.http.post('https://upload.uploadcare.com/base/', data).subscribe((events: any) => {
      var json = {events}
      for (var prop in json) {
        console.log("wew", json[prop].file)
        for (const variables of files) {
          this.photoLink = `https://ucarecdn.com/${json[prop].file}/${variables.name}`

        }
      }
    })
  }

}
