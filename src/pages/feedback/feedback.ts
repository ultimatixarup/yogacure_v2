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
  selectedYoga:any;
  source;any;
  
  constructor(public navParams: NavParams,public viewCtrl: ViewController, public http: Http) {
  //alert("inside");
  this.selectedYoga = navParams.get('data');
  this.selectedDisease = navParams.get('selectedDisease');
  this.source = navParams.get('source');
  
   if(window.localStorage.getItem("USER")!=null){
                this.feedbackName = window.localStorage.getItem("USER");
            }
            
            if(window.localStorage.getItem("EMAIL")!=null){
                this.feedbackEmail = window.localStorage.getItem("EMAIL");
            }
            //alert("here");
            
  
   var data={
            identifier:this.feedbackName+"#"+this.feedbackEmail+"#"+this.selectedDisease.name+"#"+this.selectedYoga.name
            
            };
            
            //alert("data===="+JSON.stringify(data));
  
  this.http.post('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/getFeedbackByContext',data).subscribe(resp => {
              //alert(resp['_body']);                                                                                                   
         this.items = JSON.parse(resp['_body']).Items;
         //alert(this.items);
         
   });
   
           
  
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  
  submitFeedback(){
            window.localStorage.setItem("USER",this.feedbackName);
            window.localStorage.setItem("EMAIL",this.feedbackEmail);
            
            var data={
                identifier:this.feedbackName+"#"+this.feedbackEmail+"#"+this.selectedDisease.name+"#"+this.selectedYoga.name,message:this.feedbackMsg
            };
            //alert("data===="+JSON.stringify(data));
            this.http.post('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/feedbackFunction',JSON.stringify(data)) .subscribe(data => {
            //alert(data);
            //alert("Feedback added");
        }, error => {
           // alert("Oooops!");
        });
            
        this.viewCtrl.dismiss();
  }
  
}
