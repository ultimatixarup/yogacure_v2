import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public streamingMedia: StreamingMedia) {
    // If we navigated to this page, we will have an item available as a nav param
    //alert("starting media");
    this.selectedYoga = navParams.get('yogadata');
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
            if(cachedelements != null && cachedelements.length > 0){
            
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
            
            if(easyvid.length > 0){
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
            //alert("addfav");
            //console.log("fav label="+$scope.favLabel);
            if(this.favLabel == "Remove from Favorite"){
            
            this.favLabel = "Add to Favorite"
            
            } else {
            this.favLabel = "Remove from Favorite";
            }
            
            
            var elements = window.localStorage.getItem("FAVS");
            var removed = false;
            
            if(elements === null || elements.length == 0){
            var elements = [];
            elements.push(this.selectedYoga);
            window.localStorage.setItem("FAVS",JSON.stringify(elements));
            console.log(elements);
            } else {
            
            //if already exists in faverites list, then remove it
            var elements1=JSON.parse(elements);
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
  
  
  
  
  
            
}
            
            
  

