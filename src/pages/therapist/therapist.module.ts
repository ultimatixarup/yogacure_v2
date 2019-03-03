import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TherapistPage } from './therapist';

@NgModule({
  declarations: [
    TherapistPage,
  ],
  imports: [
    IonicPageModule.forChild(TherapistPage),
  ],
})
export class TherapistPageModule {}
