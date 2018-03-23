import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPage } from '../media/media';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { ModalController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-quickfix',
  templateUrl: 'quickfix.html'
})
export class QuickFixPage {
  selectedItem: any;
  icons: string[];
  items: Array<{name: any,label:any, description: any, data: any, image: any, type: any,easyvid:any,icon:any}>;
  header: string;
  selectedDisease:any;
  numberOfLikes:any;
  numberOfComments:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    var type = navParams.get('item').name;
    this.selectedDisease = navParams.get('item');
    
    this.numberOfLikes = "10";
    this.header = type;
    //console.log(type);
    
    //alert(window.localStorage.getItem("YOGAS"));
    
    var resp = JSON.parse(window.localStorage.getItem("YOGAS"))[type];
            console.log(JSON.stringify(resp));
            this.items = [];
            
            //console.log('Success', resp);
            
            //alert(resp[3][0]);
            
            for(var i = 0; i < resp.length; i++) {
            
            var element= { name: resp[i][0],label:resp[i][5], description: resp[i][1], data: resp[i][2], image: 'media/'+resp[i]  [2].split('.')[0]+'.jpg', type: resp[i][4],easyvid:resp[i][6],icon:resp[i][2].split('.')[0]+'.jpg'};
            
            
            this.items.push(element);
            }
    
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //alert("calling media");
    this.navCtrl.push(MediaPage, {
      yogadata: item,
      selectedDisease: this.selectedDisease
    });
  }
  
  goToHome(){
    this.navCtrl.setRoot(HomePage,{});
  }
  
  goToFavs(){
    this.navCtrl.push(FavoritesPage,{});
  }
  
  thumbsUp(item){
    console.log(item);
  }
  
  commentsPop(item){
    alert("hi");
    let myModal = this.modalCtrl.create(FeedbackPage,{data: item.data, 
    selectedDisease: this.selectedDisease, source: "quickfix"});
    myModal.present();
  
  }
  
   goToProducts(){
        this.navCtrl.push(PaymentPage);
    }
  
  
  
}
