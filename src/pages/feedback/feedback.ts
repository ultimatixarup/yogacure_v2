import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { Http } from '@angular/http';


@Component({
  selector: 'page-list',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  feedbackName:string;
  feedbackEmail:string;
  feedbackMsg:string;
  items:any;
  selectedDisease:any;
  
  constructor(public navParams: NavParams,public viewCtrl: ViewController, public http: Http) {
  
  this.selectedYoga = navParams.get('data');
  this.selectedDisease = navParams.get('selectedDisease');
  this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getFeedbackByContext').subscribe(resp => {
                                                                                                                 
         this.items = resp['_body'].Items;
         alert(items);
         
   });
   
            if(window.localStorage.getItem("USER")!=null){
                this.feedbackName = window.localStorage.getItem("USER");
            }
            
            if(window.localStorage.getItem("EMAIL")!=null){
                this.feedbackEmail = window.localStorage.getItem("EMAIL");
            }
            //alert("here");
            
  
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  
  submitFeedback(){
            window.localStorage.setItem("USER",this.feedbackName);
            window.localStorage.setItem("EMAIL",this.feedbackEmail);
            
            var data={
                identifier:this.feedbackName+"#"+this.feedbackEmail+"#"+this.selectedDisease+"#"+this.selectedYoga.name,message:this.feedbackMsg
            };
            this.http.post('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/feedbackFunction', JSON.stringify(data));
            
        this.viewCtrl.dismiss();
  }
  
}
