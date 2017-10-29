import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { hotSearchPage } from './hotSearch';

@NgModule({
  declarations: [
    hotSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(hotSearchPage),
  ],
  exports: [
    hotSearchPage
  ]
})
export class hotSearchPageModule {}
