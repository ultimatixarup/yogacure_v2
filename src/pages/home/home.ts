import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';
import { FavoritesPage } from '../favorites/favorites';
import { ContactPage } from '../contact/contact';
import { StreamingMedia } from '@ionic-native/streaming-media';

import {LoginComponent} from '../auth/login.component';

import {LoggedInCallback} from "../../providers/cognito.service";
import {UserLoginService} from "../../providers/userLogin.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements LoggedInCallback  {
  loginLabel:string;
  loggedIn:any;
  loggedinUser:string;
  
  // check if user logged in. If logged in then set valid login label
  constructor(public navCtrl: NavController, public navParams:NavParams,public userService: UserLoginService,public streamingMedia: StreamingMedia ) {
  
     this.userService.isAuthenticated(this);
     
    
    /*
    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
    
    this.fcm.onTokenRefresh().subscribe(token => {
      alert(token);
    });*/   
    
    
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
  
  goToContact(){
    this.navCtrl.push(ContactPage,{});
  }
  
  goToLogin(){
  
  
    if(this.loginLabel == "Logout"){
      this.userService.logout();
      this.loginLabel ="Login / Register";
     
    } else{
        this.navCtrl.push(LoginComponent);
    }
    
    
  }
  
  isLoggedInCallback(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.loggedIn = true;
            this.loginLabel ="Logout";
        } else {
            this.loginLabel ="Login / Register";
        }
        //this.navCtrl.setRoot(LoginComponent)
    }
    
    
    playWhoAmI(){
    
          var options = {
            successCallback: function() {
            console.log("Video was closed without error.");
            //window.plugins.streamingMedia.suspend();
            },
            errorCallback: function(errMsg) {
            console.log("Error! " + errMsg);
            alert(errMsg);
            },
            //orientation: 'landscape'
            };
            
            var path =  "http://d1dcu4sbskithe.cloudfront.net/mandukya.3gp";
            this.streamingMedia.playVideo(path,options);
 
    }

}
