import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  
  
  constructor(public navCtrl: NavController) {
    
    this.loginLabel ="Login / Register";
    this.loggedIn = false;
    if(window.localStorage.getItem("LOGGEDIN")!=null)
        this.loggedIn = window.localStorage.getItem("LOGGEDIN");
    //alert(this.loggedIn);
    if(this.loggedIn == true){
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
    this.navCtrl.push(LoginPage);
    
  }

}
