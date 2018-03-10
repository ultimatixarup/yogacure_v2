import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';
import { FavoritesPage } from '../favorites/favorites';

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
  constructor(public navCtrl: NavController, public navParams:NavParams,public userService: UserLoginService ) {
  
     this.userService.isAuthenticated(this);
    
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

}
