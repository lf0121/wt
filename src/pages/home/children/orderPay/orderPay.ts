import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { discountPage } from '../discount/discount'; // 优惠券

@Component({
  selector: 'page-orderPay',
  templateUrl: 'orderPay.html'
})
export class orderPayPage {

    resDatas;
    allPrice:Number;
    resArray;
    a=0;

    payWay = [
        {
            img:'../assets/images/wechat_1.png',
            mes:'微信支付'
        },{
            img:'../assets/images/pay_1.png',
            mes:'支付宝支付'
        }
    ]

  constructor(public navCtrl: NavController,public navParams: NavParams) {
        this.resDatas = navParams.data;  //接收传过来的数据
        console.log( this.resDatas )


        this.allPrice = this.resDatas.item;
        if( this.resDatas.data ){
            this.resArray = this.resDatas.data;
                console.log( this.resArray )
            for( let m=0;m<this.resArray.length;m++ ){
                this.a = this.a + ( this.resArray[m]['num'] * (this.resArray[m]['price']) ) ;  //总价
                // console.log( this.a )
                this.allPrice = this.a;
            }
            
        }
        
        

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

//   进去优惠券
enterDiscount(){
    this.navCtrl.push( discountPage )
}

}
