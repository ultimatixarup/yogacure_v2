import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToAilements(param):void{
    //alert("in here");
     this.navCtrl.push(YogaPage, {
      type: param
    });
  }
  
  goToHome(param):void{
    //alert("in here");
     this.navCtrl.setRoot(HomePage);
  }
  
  goToFavs(){
    this.navCtrl.push(FavoritesPage,{});
  }  

}
