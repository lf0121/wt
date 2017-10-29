import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { searchResultPage } from './searchResult';

@NgModule({
  declarations: [
    searchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(searchResultPage),
  ],
  exports: [
    searchResultPage
  ]
})
export class searchResultPageModule {}
