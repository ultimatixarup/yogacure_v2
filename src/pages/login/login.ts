import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username:string;
  password:string;
  loggedIn:any;
  loginLabel:string;
  
  constructor(public navCtlr: NavController, public http: Http) {
     
     this.loggedIn = window.localStorage.getItem("LOGGEDIN");
     if(this.loggedIn == true){
       this.loginLabel = "Logout";
     }
 
  }

 
  
  login(){
       
    let body = {"username": this.username, "password": this.password,"status":"loggedin"};

   
 
     this.http.post('https://ygug5qdleb.execute-api.us-east-1.amazonaws.com/prod/loginfunction', body)
            .subscribe(
                response => {
                    window.localStorage.setItem("LOGGEDIN",true);
                }, error => {
                   alert(error);
                }
            );
    this.navCtlr.setRoot(HomePage);
       
       
       
       
       
  }
  
}
