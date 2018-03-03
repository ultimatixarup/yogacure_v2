import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToAilements(param):void{
     this.navCtrl.push(YogaPage, {
      type: param
    });
  }

}
