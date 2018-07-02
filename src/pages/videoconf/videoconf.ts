import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the VideoconfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videoconf',
  templateUrl: 'videoconf.html',
})
export class VideoconfPage {
 url: SafeResourceUrl;;
  constructor(public navCtrl: NavController, public navParams: NavParams,public domSanitizer: DomSanitizer) {
    this.url=this.domSanitizer.bypassSecurityTrustResourceUrl("https://appr.tc/");
    
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoconfPage');
  }

}
