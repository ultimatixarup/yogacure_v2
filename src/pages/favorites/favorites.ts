import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPage } from '../media/media';
import { HomePage } from '../home/home';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  selectedItem: any;
  icons: string[];
  items: Array<{name: any,label:any, description: any, data: any, image: any, type: any,easyvid:any,icon:any}>;
  header: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.header = "Favorites";
     var elements = window.localStorage.getItem("FAVS");
           //alert(elements);
     this.items = JSON.parse(elements);
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //alert("calling media");
    this.navCtrl.push(MediaPage, {
      yogadata: item
    });
  }
  
  goToHome(param):void{
    //alert("in here");
     this.navCtrl.setRoot(HomePage);
  }
  
  goToProducts(){
        this.navCtrl.push(PaymentPage);
    }
}
