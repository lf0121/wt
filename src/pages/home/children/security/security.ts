import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})
export class securityPage {

    imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
    resDatas;
    dataArray;
    pic;


  constructor(  public navCtrl: NavController,
                public navParams: NavParams
                
                ) {
    this.resDatas = navParams.data;  //接收传过来的数据
    console.log( this.resDatas )
    

    this.dataArray = this.resDatas.data;
    this.dataArray[0]['image'] = this.imgUrl+this.dataArray[0]['image'];
    // console.log( this.dataArray[0]['image'] )
    this.pic = this.dataArray[0]['image'];
    

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
