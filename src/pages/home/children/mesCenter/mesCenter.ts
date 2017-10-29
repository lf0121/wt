import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { discountPage } from '../discount/discount';  // 优惠活动
import { noticePage } from '../notice/notice';  //通知消息


@Component({
  selector: 'page-mesCenter',
  templateUrl: 'mesCenter.html'
})
export class mesCenterPage {
  compents;
  list = [
    {
      img:'../assets/images/mes_1.png',
      text:'优惠活动',
      mes:'点击查看味淘为您精心准备的优惠活动信息',
      compents:discountPage
    },{
      img:'../assets/images/mes_2.png',
      text:'卡券消息',
      mes:'点击查看卡券消息',
      compents:noticePage
    },{
      img:'../assets/images/mes_3.png',
      text:'通知消息',
      mes:'点击查看卡券过期、优惠活动等提示消息',
      compents:noticePage
    },{
      img:'../assets/images/mes_4.png',
      text:'评论互动',
      mes:'点击查看您的评论互动消息',
    }
  ]

  constructor(public navCtrl: NavController) {

  }

  click(i){
    console.log( i )
    this.compents = this.list[i]['compents'];
    this.navCtrl.push( this.compents )
  
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
