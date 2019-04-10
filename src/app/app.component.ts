import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AwsUtil } from '../providers/aws.service';



import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';

import { PolicyPage } from '../pages/policy/policy';
import { ContactPage } from '../pages/contact/contact';

//import { FCM } from '@ionic-native/fcm';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { LoadingController } from 'ionic-angular';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public http: Http,public events: Events,
                public awsUtil: AwsUtil ,private push: Push,public loadingCtrl:LoadingController) {
    this.initializeApp();
    this.awsUtil.initAwsService();
    
   

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Policy', component: PolicyPage },
       { title: 'Contact', component: ContactPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeCache();
      this.initializePushApp();
      

    });
    
  }
  
  
  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
  initializeCache(){
   //alert("init");
  let loader = this.loadingCtrl.create({
    content: "Initializing Application..."
  });
  loader.present();
            this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=disease').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("DISEASES",resp['_body']);
        loader.dismiss();
  }, 1000);

});


/* loader.present();
            this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=menu').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("MENU",resp['_body']);
        loader.dismiss();
  }, 1000);

});*/
            
  loader.present();          
this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/GetYogas').subscribe( resp => {
                                                                                                   //alert(resp);
                                                                                                   //alert(resp['_body']);
                                                                                                   
  setTimeout(() => {
        window.localStorage.setItem("YOGAS",resp['_body']);
        loader.dismiss();
  }, 1000);                                                                                                 

                                                                                                   });
            
}
            // cache the list of diseases
reload(){
          //  alert("reload");
  let loader = this.loadingCtrl.create({
    content: "Initializing Application..."
  });
  loader.present();
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=disease').subscribe(resp => {
        window.localStorage.setItem("DISEASES",resp['_body']);
        loader.dismiss();
        });
        
        loader.present();
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=menu').subscribe(resp => {
        window.localStorage.setItem("MENU",resp['_body']);
        loader.dismiss();
        });
        
        loader.present();
        this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/GetYogas').subscribe(resp => {                                       window.localStorage.setItem("YOGAS",resp['_body']);
              loader.dismiss();
        });
    
        
    }
    
    
    
    initializePushApp() {
      const options: PushOptions = {
           android: {},
           ios: {
               alert: 'true',
               badge: true,
               sound: 'false'
           },
           windows: {},
           browser: {
               pushServiceURL: 'http://push.api.phonegap.com/v1/push'
           }
        };

        const pushObject: PushObject = this.push.init(options);


        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => 
        
        this.saveToken(registration));
        

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
    
    
saveToken(token){
   //alert(token.registrationId);
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/savetoken?token='+token.registrationId).subscribe(resp =>     {});
  
  }
    
  
  
  
  }

