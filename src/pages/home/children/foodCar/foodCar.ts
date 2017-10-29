import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { orderPayPage } from '../orderPay/orderPay'; //订单支付


@Component({
  selector: 'page-foodCar',
  templateUrl: 'foodCar.html'
})
export class foodCarPage {
    resDatas;

    foodList = [];
    allPrice = 0;
    allNum = 0;

constructor(public navCtrl: NavController,
            public navParams: NavParams
            ) {

    this.resDatas = navParams.data;  //接收传过来的数据
    console.log( this.resDatas )

    this.foodList = this.resDatas.data;

    for(let a=0;a<this.foodList.length;a++){
        this.allNum = this.allNum + this.foodList[a]['num'];    //总数量

        // Number((a+b).toFixed(2))  处理double小数相加 出现多位小数的问题
        // this.allPrice =Number( ( this.n + Num_price ) ).toFixed(2);
        this.allPrice = this.allPrice + ( this.foodList[a]['num']*this.foodList[a]['price'] ) ;  //总价
    }
    console.log( this.allNum );
    console.log( this.allPrice );
    
    

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

// 删除选中的item  done
spliceItem( i,item ){
    console.log( i )
    console.log( item )
    
    this.foodList.splice( i,1 );    // 删除选中的一列
    this.allNum = this.allNum - item.num;   // 购物车的总数量
    this.allPrice = this.allPrice - Number(item.price * item.num);  // 购物车的总价格 

}
    
//   减数量    done
remove(i,item){
    console.log( '减数量' )
    console.log( i )
    console.log( item )
    
    if( this.foodList[i].num>0 ){
        this.foodList[i].num = this.foodList[i].num - 1;    // 单品显示的数量
        this.allNum = this.allNum - 1;    //购物车显示的总数量
        this.allPrice = this.allPrice - Number( item.price );   // 购物车显示的总价格
        
    }
    // if( item.num=0 ){
    //     // this.foodList.splice(i,1)
    // }
}
//   加数量    done
add(i,item){
    console.log( '加数量' )
    console.log( item )

    this.foodList[i].num = this.foodList[i].num + 1;    //加减里面显示的数量
    this.allNum = this.allNum + 1;    //购物车显示的总数量
    this.allPrice = this.allPrice + Number( item.price );   //购物车显示的总价格
}

  

//   跳转支付页面
  openPay( allPrice ){
      this.navCtrl.push( orderPayPage,{
          item:allPrice
      } )
  }

}
