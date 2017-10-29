import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

// md5
import { Md5 } from "ts-md5/dist/md5";

// 服务
import 	{ PublicfunProvider } from '../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../providers/httpfun/httpfun';

import { orderPayPage } from '../home/children/orderPay/orderPay';  //支付页面
import { orderDetailPage } from '../home/children/orderDetail/orderDetail';  //查看订单详情


@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class orderPage {
  chooseArray = ['mine','friend','reserve'];
  choose:String = this.chooseArray[0];
  userId=1;  //用户ID
  type=1; //订单类型 1预订单 2已接订单 3已拒绝订单 4已付订单 5未付订单,6新订单
  page = 1; //页数
  limit = 20; //每页的限制条数
  searchWords:any = String;
  token = 1;  // token
  sign; //签名
  timeLocalDate;
  timeLocalTime;

  // 我的订单数据
  orderList=[];
  // 朋友订单
  friendsList=[];
  // 预定订单数据
  reserveArray=[];
  time;
  timestamp;
  resData;
  imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
  reserveArrayTime=[];
  sign_1;
  



constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,

              ) {

                this.timeLocalDate = (new Date()).toLocaleDateString();  //当前日期部分
                this.timeLocalTime = (new Date()).toLocaleTimeString();  //当前时间部分
                
                this.time = new Date();
                this.timestamp = Date.parse( this.time ); 

            // md5加密签名
            this.sign = Md5.hashStr( this.userId+this.timestamp+this.token );

                    // 预定订单列表
                    this.reserveOrder();

                    // 用户订单
                    this.userOrder();           

                    // 朋友订单
                    this.friendsOrder();

}

// API

// 我的订单
userOrder(){
    this.serve.get( '?service=Order.MemberOrder&uid='+this.userId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then(datas=>{
        console.log( datas );
        this.resData = datas;
        this.orderList = this.resData.data;
        for( let m=0;m<this.orderList.length;m++ ){
              this.orderList[m]['image'] = this.imgUrl + this.orderList[m]['image'];
              // 修改状态
              if( this.orderList[m]['status']=='0' ){
                  this.orderList[m]['status'] = '订单无效'
              }else if( this.orderList[m]['status']=='1' ){
                  this.orderList[m]['status'] = '新订单'
              }else if( this.orderList[m]['status']=='2' ){
                  this.orderList[m]['status'] = '交易进行中'
              }else if( this.orderList[m]['status']=='3' ){
                  this.orderList[m]['status'] = '订单正在付款'
              }else if( this.orderList[m]['status']=='4' ){
                  this.orderList[m]['status'] = '订单完成'
              }else if( this.orderList[m]['status']=='5' ){
                  this.orderList[m]['status'] = '商家拒绝'
              }else if( this.orderList[m]['status']=='6' ){
                  this.orderList[m]['status'] = '商家接单'
              }else if( this.orderList[m]['status']=='7' ){
                  this.orderList[m]['status'] = '未付清款'
              }else if( this.orderList[m]['status']=='8' ){
                  this.orderList[m]['status'] = '未付款'
              }
        }
    })
}
// 朋友订单
friendsOrder(){
    this.serve.get( '?service=Order.FriendOrder&uid='+this.userId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then(datas=>{
        console.log( datas );
        this.resData = datas;
        this.friendsList = this.resData.data;
        for( let n=0;n<this.friendsList.length;n++ ){
            this.friendsList[n]['image']  = this.imgUrl + this.friendsList[n]['image'];
            // 修改状态
            if( this.friendsList[n]['status']=='0' ){
                this.friendsList[n]['status'] = '订单无效'
            }else if( this.friendsList[n]['status']=='1' ){
                this.friendsList[n]['status'] = '新订单'
            }else if( this.friendsList[n]['status']=='2' ){
                this.friendsList[n]['status'] = '交易进行中'
            }else if( this.friendsList[n]['status']=='3' ){
                this.friendsList[n]['status'] = '订单正在付款'
            }else if( this.friendsList[n]['status']=='4' ){
                this.friendsList[n]['status'] = '订单完成'
            }else if( this.friendsList[n]['status']=='5' ){
                this.friendsList[n]['status'] = '商家拒绝'
            }else if( this.friendsList[n]['status']=='6' ){
                this.friendsList[n]['status'] = '商家接单'
            }else if( this.friendsList[n]['status']=='7' ){
                this.friendsList[n]['status'] = '未付清款'
            }else if( this.friendsList[n]['status']=='8' ){
                this.friendsList[n]['status'] = '未付款'
            }
  
        }
    })
}
// 预订订单
reserveOrder(){
    this.serve.get( '?service=Order.ReserveOrderList&uid='+this.userId
        +'&time='+this.timestamp+'&token='
        +this.token+'&sign='+this.sign )
        .then(data=>{
            console.log( data )
            this.resData = data;
            this.reserveArray = this.resData.data;
            for( let a=0;a<this.reserveArray.length;a++ ){
                    this.reserveArray[a]['image'] = this.imgUrl + this.reserveArray[a]['image'];
                    // 转换时间戳
                    let time= this.pbp.stotime(this.reserveArray[a].time);
                    this.reserveArrayTime.push(time);
                    // 修改状态
                    if( this.reserveArray[a]['status']=='0' ){
                        this.reserveArray[a]['status'] = '订单无效'
                    }else if( this.reserveArray[a]['status']=='1' ){
                        this.reserveArray[a]['status'] = '新订单'
                    }else if( this.reserveArray[a]['status']=='2' ){
                        this.reserveArray[a]['status'] = '交易进行中'
                    }else if( this.reserveArray[a]['status']=='3' ){
                        this.reserveArray[a]['status'] = '订单正在付款'
                    }else if( this.reserveArray[a]['status']=='4' ){
                        this.reserveArray[a]['status'] = '订单完成'
                    }else if( this.reserveArray[a]['status']=='5' ){
                        this.reserveArray[a]['status'] = '商家拒绝'
                    }else if( this.reserveArray[a]['status']=='6' ){
                        this.reserveArray[a]['status'] = '商家接单'
                    }else if( this.reserveArray[a]['status']=='7' ){
                        this.reserveArray[a]['status'] = '未付清款'
                    }else if( this.reserveArray[a]['status']=='8' ){
                        this.reserveArray[a]['status'] = '未付款'
                    }
            }
    })
}


// 去付款
goPay(item,i){
    this.navCtrl.push( orderPayPage,{
      item:item.money
    } )
}

  // 删除自己订单
deleteOrder(list,i){
    console.log( list )
    // 删除订单接口
    this.sign_1 = Md5.hashStr( list.id+this.timestamp+this.token );
    this.serve.get2( '?service=Order.OrderDel&order_id='+list.id+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_1 ).then( data=>{
        console.log( data );
        this.resData = data;
        if( this.resData.data==1 ){
            this.orderList.splice(i,1);
        }
    } )

}

// 删除朋友的订单
deleteFriendOrder( aa,i ){
    console.log(aa)
    // 删除订单
    this.sign_1 = Md5.hashStr( aa.id+this.timestamp+this.token )
    this.serve.get( '?service=Order.OrderDel&order_id='+aa.id+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_1 ).then( data=>{
        console.log( data );
        this.resData = data;
        if( this.resData.data==1 ){
            this.orderList.splice(i,1);
        }
    } )
}

// 查看订单详情
shopOrderDetail( list,i ){
      // 查看订单详情
      let sendData;
      this.sign_1 = Md5.hashStr( list.id+this.timestamp+this.token )    
      this.serve.get( '?service=Order.OrderInfo&order_id='+list.id+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_1 ).then(data=>{
            // console.log( data );
            this.resData = data;
            sendData = this.resData.data;
            // console.log( sendData )
            this.navCtrl.push( orderDetailPage,{
                data:sendData
            } )
      })
}

// 下拉刷新 	重新加载本页
doRefresh(refresher) {
        // 用户订单
        this.userOrder();  
        // 朋友订单
        this.friendsOrder();
        // 预定订单列表
        this.reserveOrder();

	setTimeout( ()=>{
        refresher.complete();
    },1000 )
}


}
