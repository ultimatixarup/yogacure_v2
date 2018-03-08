import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YogaPage } from '../yoga/yoga';
import { FavoritesPage } from '../favorites/favorites';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginLabel:string;
  loggedIn:any;
  loggedinUser:string;
  
  
  constructor(public navCtrl: NavController, public navParams:NavParams ) {
  
    this.loggedinUser = navParams.get('loggedinUser');
    
    this.loginLabel ="Login / Register";
    this.loggedIn = false;
    if(!(window.localStorage.getItem("LOGGEDIN"))){
        alert('setting to logout'+window.localStorage.getItem("LOGGEDIN"));
        this.loggedinUser = window.localStorage.getItem("LOGGEDIN");
        this.loginLabel = "Logout";
    }
    
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
     alert("login out");
      window.localStorage.setItem("LOGGEDIN",null);
      this.navCtrl.push(HomePage);
    } else{
        this.navCtrl.push(LoginPage);
    }
    
    
  }

}
