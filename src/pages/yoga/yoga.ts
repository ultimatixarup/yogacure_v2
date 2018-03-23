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
  
            this.userService.isAuthenticated(this);
            var type = navParams.get('type');
            if(type == '15')
                this.header = "15 Min Drills";
            else if(type == '60')
                this.header = "One Hour Drills";
            else 
                this.header = "Meditations";
            
            this.allowed = ["diabetes","knee pain","Headache"];
            
            var resp = JSON.parse(window.localStorage.getItem("DISEASES"));
            
            //alert("resp=="+resp);
            
            this.items = [];
            
            
            for(var i = 0; i < resp.length; i++) {
            
            
            if(type == "60"){
            
            if(resp[i][5].indexOf("-60")>0){
            //console.log("creating element");
            var element= { label: resp[i][0],name: resp[i][5],description: resp[i][1], data: resp[i][2], image: resp[i][3].replace("-60",""), type: resp[i][4]};
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
            
  
  
  
   /*sortItems(){
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
            
            
            
            
            }*/

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
