import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html'
})
export class noticePage {

  constructor(public navCtrl: NavController) {

  }

   // 进入页面 隐藏tabs
   ionViewDidEnter(){
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }   

  }
  
  // 退出页面 显示tabs
  ionViewWillLeave() {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'flex';
          });
      }
  }

}
