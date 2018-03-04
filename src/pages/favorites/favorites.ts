import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPage } from '../media/media';
import { HomePage } from '../home/home';

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
    
     var elements = window.localStorage.getItem("FAVS");
           
     this.items = JSON.parse(elements);
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //alert("calling media");
    this.navCtrl.push(MediaPage, {
      yogadata: item
    });
  }
  
  goToHome(){
    this.navCtrl.push(HomePage,{});
  }
}
