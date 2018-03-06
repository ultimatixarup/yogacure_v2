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
  loginMessage:string;
  
  constructor(public navCtlr: NavController, public http: Http) {
     
     this.loggedIn = window.localStorage.getItem("LOGGEDIN");
     if(this.loggedIn != null ){
       this.loginLabel = "Logout";
     } else {
       this.loginLabel = "Login / Sign up";
     }
     this.loginMessage = "";
 
  }

  
 
  
  signup(){
       
    let body = {"username": this.username, "password": this.password,"status":"loggedin"};

   
 
     this.http.post('https://ygug5qdleb.execute-api.us-east-1.amazonaws.com/prod/loginfunction', body)
            .subscribe(
                response => {
                   // window.localStorage.setItem("LOGGEDIN");
                   this.loginMessage = "Account created, please login";
                }, error => {
                   alert(error);
                }
            );
 }
 login(){
 
 let body = {"username": this.username, "password": this.password};

   
 
     this.http.post('https://ygug5qdleb.execute-api.us-east-1.amazonaws.com/prod/authenticate', body)
            .subscribe(
                response => {
                   // window.localStorage.setItem("LOGGEDIN","true");
                   console.log(response);
                   if(response._body.indexOf("pass") > -1){
                    window.localStorage.setItem("LOGGEDIN",this.username);s
                    this.navCtlr.setRoot(HomePage,{
                        "loggedinUser":this.username,
                       
                    });
                   } else {
                    this.loginMessage = "Login failed";
                   }
                }, error => {
                   alert(error);
                }
            );
 
 
 }
  
}
