import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-common'
    });
export class CommonNavComponent{


constructor(public navCtrl: NavController, public navParams: NavParams) {
  alert("cons");
}

goToHome(){
    alert("hi");
    this.navCtrl.push(HomePage, {});
    
}


}