import { Plugins } from '../../services/plugins.service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


// import {Alert} from 'ionic-framework/ionic'; // no need for Page


import { Http } from '@angular/http';

// import { Http} from '@angular/http';
import {UploadingPage} from '../uploading/uploading';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	images: Array<string> = [];
	public base64Image: string;
	uploadingPage = UploadingPage;

  constructor(private http: Http, private navCtrl: NavController, private plugins: Plugins) {
  	this.http = http;
  	this.navCtrl = navCtrl;

  }

   openAlbums = () : void => {
        this.plugins.albums.open().then((imgUrls) => {            
            if(imgUrls) {
            this.images.push(imgUrls);            
          } 
        });        
    }
      
    openCamera = () : void => { 
        this.plugins.camera.open().then((imageUrl) => { 
          if(imageUrl) {
            this.images.push(imageUrl);            
          }
      });
    }
    
    startUploading = () : void => {
      this.navCtrl.setRoot(UploadingPage, {
          images: this.images
      });
      console.log(this.images);
      }  


makePostRequest() {
	var data1 = {
                'notes': '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'
    };
    this.http.post("http://sebastianperez.pythonanywhere.com/api/v1/notes", data1)
        .subscribe(data => {
        // var alert = Alert.create({
        //     title: "Data String",
        //     subTitle: data.json().data,
        //     buttons: ["close"]
        // });
        // this.nav.present(alert); // I guess this is deprecated line, see http://stackoverflow.com/questions/41932399/ionic2-property-present-does-not-exist-on-type-navcontroller
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
}



}


