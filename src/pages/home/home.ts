import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';
import { FavoritesPage } from '../favorites/favorites';
import { ContactPage } from '../contact/contact';
import { StreamingMedia } from '@ionic-native/streaming-media';

import {LoginComponent} from '../auth/login.component';

import {LoggedInCallback} from "../../providers/cognito.service";
import {UserLoginService} from "../../providers/userLogin.service";

import { ModalController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';

import { MediaPage } from '../media/media';


import { Http } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';




import { LoggerComponent } from '../../components/logger/logger';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements LoggedInCallback  {
  loginLabel:string;
  loggedIn:any;
  loggedinUser:string;
  
  // check if user logged in. If logged in then set valid login label
  constructor(private logger: LoggerComponent, public navCtrl: NavController, public navParams:NavParams,public userService: UserLoginService,public streamingMedia: StreamingMedia,public modalCtrl: ModalController,public http:Http,public loadingCtrl:LoadingController,private iab: InAppBrowser) {
  
   
   this.logger.logEvent('Home');
     this.userService.isAuthenticated(this);

    
  }
  
  
  goToAilements(param):void{
    //alert("in here");
    this.logger.logEvent('Going to page:'+param);
     this.navCtrl.push(YogaPage, {
      type: param
    });
  }
  
  goToTherapists(){
    this.logger.logEvent('Going to Therapist page');
    this.navCtrl.push(Therapist,{});
  }
  
  goToHome(param):void{
    //alert("in here");
    this.logger.logEvent('Home');
     this.navCtrl.setRoot(HomePage);
  }
  
  goToFavs(){
   this.logger.logEvent('Going to Fav page');
    this.navCtrl.push(FavoritesPage,{});
  } 
  
  goToContact(){
   this.logger.logEvent('Going to Contact page');
    this.navCtrl.push(ContactPage,{});
  }
  
  goToLogin(){
  
   this.logger.logEvent('Going to Login/Logout page');
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
     this.logger.logEvent('Going to Who am I page');
             var element= { name: "Mission and Vision",label:"Who we are", description: "Mission vision and values", data: "mandukya.3gp", image: 'media/mandukya.jpg', type: ' ',easyvid:"",icon:'mandukya.jpg'};
            
            this.navCtrl.push(MediaPage, {
              yogadata: element,
              selectedDisease: ""
            });
          
            
           
          
 
    }
    goToFeedback(){
    this.logger.logEvent('Going to Feedback page');
        let myModal = this.modalCtrl.create(FeedbackPage,{data : "genericFeedback",selectedDisease: "genericFeedback"});
        myModal.present();
    
    }
    
    refresh(){
      // alert("reload");
       this.logger.logEvent('Trying to refresh page');
      let loading = this.loadingCtrl.create({
        content: 'Reloading...'
      });
      loading.present();
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=disease').subscribe(resp => {
        window.localStorage.setItem("DISEASES",resp['_body']);
        });
        this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/GetYogas').subscribe(resp => {                                       window.localStorage.setItem("YOGAS",resp['_body']);
        });
        loading.dismiss();
    
    
    }
    
    openVideo(){
    
    
         this.iab.create('https://appr.tc/r/sanmay');
    
    }

}
