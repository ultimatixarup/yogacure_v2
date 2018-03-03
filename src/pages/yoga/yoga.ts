import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuickFixPage } from '../quickfix/quickfix';

@Component({
  selector: 'page-yoga',
  templateUrl: 'yoga.html'
})
export class YogaPage {
  selectedItem: any;
  icons: string[];
  items: Array<{label: string,name: string,description: string, data: string, image: string, type: string}>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
            var type = navParams.get('type');
  
            
            
            
            
            var resp = JSON.parse(window.localStorage.getItem("DISEASES"));
            
            //alert(resp[7][3]);
            
            this.items = [];
            
            for(var i = 0; i < resp.length; i++) {
            var element = {};
            
            if(type == "60"){
            
            if(resp[i][5].indexOf("-60")>0){
            //console.log("creating element");
            element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3].replace("-60",""), type: resp[i][4]};
            this.items.push(element);
            }
            continue;
            
            } else if(type == "meditation"){
                console.log(resp[i][5]);
                if(resp[i][5].indexOf("-meditation")>0){
                    //console.log("creating element");
                    element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i]
                    [3].replace("-meditation",""), type: resp[i][4]};
                    this.items.push(element);
                }
                continue;
            
            } else if(type == "strategy"){
                console.log(resp[i][5]);
                if(resp[i][5].indexOf("-strategy")>0){
                    //console.log("creating element");
                    element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2],
                    image: resp[i][3], type: resp[i][4]};
                    this.items.push(element);
                }
                continue;
            
            } else {
            if(resp[i][5].indexOf("-60")< 0 && resp[i][5].indexOf("-meditation")< 0 && resp[i][5].indexOf("-strategy")< 0){
            element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3], type: resp[i][4]};
            this.items.push(element);
            }
            
            }
            
            //console.log("adding element to list");
            
            
            }
           
            
            
            }
            
  
  
  
   sortItems(){
            //alert("sorting");
            
            items.sort(function(a, b) {
                              var nameA = a.label.toUpperCase(); // ignore upper and lowercase
                              var nameB = b.label.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                              return -1;
                              }
                              if (nameA > nameB) {
                              return 1;
                              }
                              
                              // names must be equal
                              return 0;
                              });
            
            
            
            
            }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(QuickFixPage, {
      item: item
    });
  }
}
