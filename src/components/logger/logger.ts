import { Component } from '@angular/core';


import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';


import { Device } from '@ionic-native/device';

/**
 * Generated class for the LoggerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'logger',
  templateUrl: 'logger.html'
})
export class LoggerComponent {

  text: string;
  deviceId:string;

  constructor(private platform:Platform, private device: Device,public http:Http) {
    console.log('Hello LoggerComponent Component');
    this.text = 'Hello World';
    this.platform.ready().then(() => {
        this.deviceId = this.device.uuid;
    });
  }
  
  logEvent(eventDetails){
  
 //alert(this.deviceId);
  
    this.http.get('https://0kvgk0xp4a.execute-api.us-east-1.amazonaws.com/prod/saveanalytics?deviceid='+this.deviceId+'&event='+eventDetails).subscribe(resp =>     {});
    
  }

}
