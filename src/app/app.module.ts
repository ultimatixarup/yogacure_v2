import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { QuickFixPage } from '../pages/quickfix/quickfix';
import { YogaPage } from '../pages/yoga/yoga';
import { MediaPage } from '../pages/media/media';
import { PolicyPage } from '../pages/policy/policy';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FeedbackPage } from '../pages/feedback/feedback';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StreamingMedia } from '@ionic-native/streaming-media';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuickFixPage,
    YogaPage,
    MediaPage,
    FeedbackPage,
    PolicyPage,
    FavoritesPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    
    //StreamingMedia,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    QuickFixPage,
    YogaPage,
    MediaPage,
    FeedbackPage,
    PolicyPage,
    FavoritesPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
