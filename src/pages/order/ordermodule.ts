import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { orderPage } from './order';

@NgModule({
  declarations: [
    orderPage,
  ],
  imports: [
    IonicPageModule.forChild(orderPage),
  ],
  exports: [
    orderPage
  ]
})
export class orderPageModule {}
