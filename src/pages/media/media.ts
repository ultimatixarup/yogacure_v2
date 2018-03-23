import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { ModalController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { PaymentPage } from '../payment/payment';


@Component({
  selector: 'page-media',
  templateUrl: 'media.html'
})
export class MediaPage {
  selectedYoga: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  favLabel : string;
  imgSrc : string;
  header: string;
  easyMode: any;
  url:any;
  options:any;
  easyVid:any;
  selectedDisease:any;
  items1: Array<{name: any,label:any, description: any, data: any, image: any, type: any,easyvid:any,icon:any}>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public streamingMedia: StreamingMedia, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    //alert("starting media");
    this.selectedYoga = navParams.get('yogadata');
    this.selectedDisease = navParams.get('selectedDisease');
    this.header = this.selectedYoga.name;
    //alert(JSON.stringify(this.selectedYoga));
    
            this.url = this.selectedYoga.data;
            
            var easyvid = this.selectedYoga.easyvid;
            
            
            var iconname = this.selectedYoga.data.split(".")[0];
            this.imgSrc = "media/"+iconname+".jpg";
            var prev = "media/"+iconname+".jpg";
            //alert(url);
            //alert(url.indexOf("mp3"));
            if(this.url.indexOf(".mp3")>0){
                prev = "media/default.png";
            }
            
           
            
            var cachedelements = window.localStorage.getItem("FAVS");
            if(cachedelements != null){
            
                var elements = JSON.parse(cachedelements);
                
                this.favLabel = "Add to Favorite";
                for(var i = 0;i<elements.length; i++){

                    var element = elements[i];
                    console.log("selected yoga name="+this.selectedYoga.name + "   element name="+element.name)
                    if(element.name == this.selectedYoga.name){
                    this.favLabel = "Remove from Favorite";


                    break;
                }
            }
           
            
            
            } else {
                this.favLabel = "Add to Favorite";
            }
            
            if(easyvid && easyvid.length > 0){
             this.easyVid = true;
            } else {
                this.easyVid = false;
            }
            //alert(this.easyVid);

   
  }

  changeVid(){
            
            //alert(this.easyMode);
            
            if(this.easyMode){
            this.url = this.selectedYoga.easyvid;
            } else {
            this.url = this.selectedYoga.data;
            }
            
            
    }
            
            
   playVid(){
            //alert("playvid");
            //alert(url);
            
            var options = {
            successCallback: function() {
            console.log("Video was closed without error.");
            //window.plugins.streamingMedia.suspend();
            },
            errorCallback: function(errMsg) {
            console.log("Error! " + errMsg);
            alert(errMsg);
            },
            //orientation: 'landscape'
            };
            
            var path =  "http://d1dcu4sbskithe.cloudfront.net/"+encodeURIComponent(this.url);
            
            if(this.url.indexOf(".mp3")>0){
            this.options =  {
            bgColor: "#FFFFFF",
            bgImage: "https://s3-us-west-2.amazonaws.com/getwellbyoga-yoga/default.png",
            bgImageScale: "fit", // other valid values: "stretch"
            
            successCallback: function() {
            console.log("Player closed without error.");
            },
            errorCallback: function(errMsg) {
            console.log("Error! " + errMsg);
            }
            };
            
            this.streamingMedia.playAudio(path,options);
            } else {
            this.streamingMedia.playVideo(path,options);
            }
    }
            
   goToHome(param):void{
    //alert("in here");
     this.navCtrl.setRoot(HomePage);
  }
  
  goToFavs(){
    this.navCtrl.push(FavoritesPage,{});
  }  
  
     addToFav(){
          
            if(this.favLabel == "Remove from Favorite"){
            
            this.favLabel = "Add to Favorite"
            
            } else {
            this.favLabel = "Remove from Favorite";
            }
            
            
            var favs = window.localStorage.getItem("FAVS");
            var removed = false;
            
            if(favs === null || favs.length == 0){
            
             //alert("1"+favs);
             this.items1 = [];
             this.items1.push(this.selectedYoga);
            window.localStorage.setItem("FAVS",JSON.stringify(this.items1));
            //console.log(elements);
            } else {
            
            //if already exists in faverites list, then remove it
            var elements1=JSON.parse(window.localStorage.getItem("FAVS"));
            //alert("2"+JSON.stringify(elements1));
            for(var i = 0;i<elements1.length; i++){
            
            var element = elements1[i];
            if(element.name == this.selectedYoga.name){
            elements1.splice(i,1);
            window.localStorage.setItem("FAVS",JSON.stringify(elements1));
            removed = true;
            break;
            }
            }
            
            if(!removed){
            elements1.push(this.selectedYoga);
            
            window.localStorage.setItem("FAVS",JSON.stringify(elements1));
            }
            
            }
            }
  
  
  openModal() {
    let myModal = this.modalCtrl.create(FeedbackPage,{data : this.selectedYoga,selectedDisease: this.selectedDisease});
    myModal.present();
  }
  
   goToProducts(){
        this.navCtrl.push(PaymentPage);
    }
            
}
            
            
  

