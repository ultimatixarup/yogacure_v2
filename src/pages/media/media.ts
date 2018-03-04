import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia } from '@ionic-native/streaming-media';

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
            
          /*  if(easyvid.length > 0){
            document.getElementById("switch").style.display = 'block';
            document.getElementById("switch_b").style.display = 'none';
            } else {
            document.getElementById("switch").style.display = 'none';
            document.getElementById("switch_b").style.display = 'block';
            
            }*/

   
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
            alert("playvid");
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
            
            
            
}
            
            
  

