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
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StreamingMedia } from '@ionic-native/streaming-media';
import { CognitoUtil } from '../providers/cognito.service';
import { AwsUtil } from '../providers/aws.service';
import { ControlPanelComponent } from '../pages/controlpanel/controlpanel';
import { EventsService } from '../providers/events.service';
import { LoginComponent } from '../pages/auth/login.component';
import { RegisterComponent } from '../pages/auth/register.component';
import { ConfirmRegistrationComponent } from '../pages/auth/confirmRegistration.component';
import { ResendCodeComponent } from '../pages/auth/resendCode.component';
import { ForgotPasswordStep1Component } from '../pages/auth/forgotPassword1.component';
import { ForgotPasswordStep2Component} from '../pages/auth/forgotPassword2.component';
import { UserLoginService} from '../providers/userLogin.service';
import { UserParametersService} from '../providers/userParameters.service';
import { UserRegistrationService} from '../providers/userRegistration.service';
import { LogoutComponent} from '../pages/auth/logout.component';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuickFixPage,
    YogaPage,
    MediaPage,
    FeedbackPage,
    PolicyPage,
    LoginPage,
    FavoritesPage,
    LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ConfirmRegistrationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPasswordStep2Component,
        ControlPanelComponent,
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
    LoginPage,
    FavoritesPage,
    LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ConfirmRegistrationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPasswordStep2Component,
        ControlPanelComponent,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    UserLoginService,
        UserParametersService,
        UserRegistrationService,
        EventsService,
        AwsUtil,
        CognitoUtil,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
