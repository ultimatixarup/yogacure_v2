import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AwsUtil } from '../providers/aws.service';



import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public http: Http,public events: Events,
                public awsUtil: AwsUtil ) {
    this.initializeApp();
    this.awsUtil.initAwsService();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeCache();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  initializeCache(){
   //alert("init");
          
            this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=disease').subscribe(resp => {
                                                                                                                 
    //alert(JSON.stringify(resp['_body'])); 
    setTimeout(() => {
        window.localStorage.setItem("DISEASES",resp['_body']);
  }, 1000);

    
    
    
                                                                                                                 });
            this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/GetYogas').subscribe( resp => {
                                                                                                   //alert(resp);
                                                                                                   //alert(resp['_body']);
                                                                                                   
  setTimeout(() => {
        window.localStorage.setItem("YOGAS",resp['_body']);
  }, 1000);                                                                                                 

                                                                                                   });
            
}
            // cache the list of diseases
reload(){
            //alert("reload");
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getvalues?type=disease').subscribe(resp => {
        window.localStorage.setItem("DISEASES",resp['_body']);
        });
        this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/GetYogas').subscribe(resp => {                                       window.localStorage.setItem("YOGAS",resp['_body']);
        });
    
        
    }
  
  
  
  }

