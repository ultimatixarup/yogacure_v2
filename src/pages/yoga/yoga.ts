import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuickFixPage } from '../quickfix/quickfix';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';

import {LoggedInCallback} from "../../providers/cognito.service";
import {UserLoginService} from "../../providers/userLogin.service";

import { AlertController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';


@Component({
  selector: 'page-yoga',
  templateUrl: 'yoga.html'
})
export class YogaPage implements LoggedInCallback {
  selectedItem: any;
  icons: string[];
  items: Array<{label: string,name: string,description: string, data: string, image: string, type: string}>;
  header: string;
  allowed:Array<{}>;
  loggedIn:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserLoginService,public alertCtrl:AlertController) {
  
            this.initializeItems();
           
            
            
            }
            
            
 initializeItems(){
            
            this.userService.isAuthenticated(this);
            var type = this.navParams.get('type');
            if(type == '15')
                this.header = "15 Min Practice";
            else if(type == '60')
                this.header = "One Hour Practice";
            else if(type == 'mobile')
                this.header = "Travel Yoga Practice";
            else
                this.header = "Meditations";
            
            this.allowed = ["diabetes","knee pain","Headache"];
            
            var resp = JSON.parse(window.localStorage.getItem("DISEASES"));
            
            //alert("resp=="+resp);
            
            this.items = [];
            
            
            for(var i = 0; i < resp.length; i++) {
            
            if(type=="15"){ // only 15 min does not have -type naming convention
                if(resp[i][5].indexOf("-")< 0){
                    element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3], type: resp[i][4]};
                    this.items.push(element);
                }
            } else if(resp[i][5].indexOf("-"+type)>0){
            //console.log("creating element");
            var element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3].replace("-"+type,""), type: resp[i][4]};
            this.items.push(element);
            }
            
            
           
          
            
            
            }
            
            
            
}
            

  
  
  searchDisease(searchbar) {
      // reset countries list with initial call
      this.initializeItems();
      // set q to the value of the searchbar
      var q = searchbar.target.value;
       
      // if the value is an empty string don't filter the items
    if (q && q.trim() != '') {
      this.items = this.items.filter((v) => {
         return (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1);
      })
      }
  }
  
  
   

  itemTapped(event, item) {
    
     if(this.allowed.indexOf(item.name) > -1){
        this.navCtrl.push(QuickFixPage, {
          item: item

        });
      } else if(this.loggedIn){
     
          this.navCtrl.push(QuickFixPage, {
              item: item

            });
      } else {
          let alert = this.alertCtrl.create({
            title: 'Access Denied',
            subTitle: 'Please login to access this feature',
            buttons: ['Dismiss']
          });
          alert.present();
      }

  }
  
  goToHome(param):void{
    //alert("in here");
     this.navCtrl.setRoot(HomePage);
  }
  
  goToFavs(){
    this.navCtrl.push(FavoritesPage,{});
  }  
  isLoggedInCallback(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.loggedIn = true;
            
        } else {
            this.loggedIn = false;
        }
        
    }
    
    goToProducts(){
        this.navCtrl.push(PaymentPage);
    }
  
}
