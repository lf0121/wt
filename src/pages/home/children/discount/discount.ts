import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-discount',
  templateUrl: 'discount.html'
})
export class discountPage {
  lists = [
    {
      price:'￥100',
      useMes:'满300可用',
      text:'温泉大酒店',
      useTime:'2017.08.14-2017.08.15',
      overdue:'1天过期'
    },{
      price:'￥200',
      useMes:'满500可用',
      text:'温泉大酒店',
      useTime:'2017.07.19-2017.07.30',
      overdue:'10天过期'
    },{
      price:'￥200',
      useMes:'满500可用',
      text:'温泉大酒店',
      useTime:'2017.08.10-2017.08.17',
      overdue:'7天过期'
    },{
      price:'￥50',
      useMes:'满100可用',
      text:'温泉大酒店',
      useTime:'2017.08.14-2017.08.16',
      overdue:'3天过期'
    }
  ]

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

  click(i){
    console.log( i )
  }
}
