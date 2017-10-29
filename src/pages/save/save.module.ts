import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { savePage } from './save';

@NgModule({
  declarations: [
    savePage,
  ],
  imports: [
    IonicPageModule.forChild(savePage),
  ],
  exports: [
    savePage
  ]
})
export class savePageModule {}
