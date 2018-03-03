import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-quickfix',
  templateUrl: 'quickfix.html'
})
export class QuickFixPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    var type = navParams.get('type');
    //alert(window.localStorage.getItem("YOGAS"));
    
    var resp = JSON.parse(window.localStorage.getItem("YOGAS"));
            alert(JSON.stringify(resp));
            this.items = [];
            
            //console.log('Success', resp);
            
            alert(resp[3][0]);
            
            for(var i = 0; i < resp.length; i++) {
            
            var element= { name: resp[i][0],label:resp[i][5], description: resp[i][1], data: resp[i][2], image: 'media/'+resp[i]  [2].split('.')[0]+'.jpg', type: resp[i][4],easyvid:resp[i][6],icon:resp[i][2].split('.')[0]+'.jpg'};
            
            
            this.items.push(element);
            }
    
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(YogaPage, {
      item: item
    });
  }
}
