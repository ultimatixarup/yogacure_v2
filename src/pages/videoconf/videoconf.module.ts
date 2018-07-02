import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoconfPage } from './videoconf';

@NgModule({
  declarations: [
    VideoconfPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoconfPage),
  ],
})
export class VideoconfPageModule {}
