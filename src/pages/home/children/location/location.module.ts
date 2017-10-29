import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { locationPage } from './location';

@NgModule({
  declarations: [
    locationPage,
  ],
  imports: [
    IonicPageModule.forChild(locationPage),
  ],
  exports: [
    locationPage
  ]
})
export class locationPageModule {}
