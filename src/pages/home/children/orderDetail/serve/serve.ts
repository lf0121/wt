import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

// md5
import { Md5 } from "ts-md5/dist/md5";

// 服务
import 	{ PublicfunProvider } from '../../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../../providers/httpfun/httpfun';

import { shopHomePage } from '../../shopHome/shopHome'; //店铺首页
import { backFoodsPage } from '../backFoods/backFoods'; //退菜
import { orderPayPage } from '../../orderPay/orderPay'; //订单支付




@Component({
  selector: 'page-serve',
  templateUrl: 'serve.html'
})
export class servePage {
    bid;
    time;
    timestamp;
    token=1;
    sign;
    sign_1;
    sign_2;
    resDatas;
    shopData;
    fun;
    foodList=[];
    imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
    shopId;//店铺ID
    userId=1;//用户ID
    tableId=1;//桌子ID
    sendData;

    orderMsg;//订单信息
    

  constructor(public navCtrl: NavController,
                public pbp:PublicfunProvider,
                public serve:HttpfunProvider,
                public alertCtrl: AlertController,
                public navParams: NavParams
        
            ) {

                this.resDatas = navParams.data;  //接收传过来的数据
                console.log( this.resDatas )

                this.shopData = this.resDatas.data.shop;//店铺信息
                console.log( this.shopData );

                this.orderMsg = this.resDatas.data.newOrder;//订单信息
                console.log( this.orderMsg )

                this.foodList = this.resDatas.data.list;//数据数组
                console.log( this.foodList );

                this.sendData = this.resDatas.data.sendData;//发送过来的信息，退菜页面用
                console.log( this.sendData )
                

                this.bid = this.shopData.bid;
                

                this.time = new Date();
                this.timestamp = Date.parse( this.time ); 
                this.sign = Md5.hashStr( this.bid+this.timestamp+this.token )                

        // 服务页面的几个小功能
        this.serve.get2( '?service=Order.OrderService&bid='+this.bid+'&time='
                            +this.timestamp+'&token='+this.token+'&sign='+this.sign ).then(data=>{
            // console.log( data )
            this.resDatas = data;
            this.fun = this.resDatas.data;
            // console.log( this.fun )
            for( let m=0;m<this.fun.length;m++ ){
                this.fun[m]['image'] = this.imgUrl+this.fun[m]['image'];
                this.fun[m]['url'] = this.imgUrl+this.fun[m]['url'];
            }
            
        })

  }


    methods( list,i ){
        console.log( list )
        if( list.id=='15' ){
            // 加菜
            this.navCtrl.push( shopHomePage,{
                item:this.shopData
            } )
        }else if( list.id=='16' ){
            // 退菜
            this.navCtrl.push( backFoodsPage,{
                data:this.foodList,
                send:this.sendData,
                detail:this.shopData,
                newOrder:this.orderMsg
            } )
        }else if( list.id=='17' ){
            //  呼叫
            this.shopId = this.shopData.bid;
            this.sign_1 = Md5.hashStr( this.userId+this.shopId+this.tableId+this.timestamp+this.token )                
            this.serve.get2('?service=Order.SetCall&uid='+this.userId+'&bid='+this.shopId+'&table_id='
                            +this.tableId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_1)
                            .then(data=>{
                                    console.log( data )
                                    this.resDatas = data;
                                    this.showAlert( this.resDatas.msg )
            })
        }else if( list.id=='18' ){
            //  付款
            this.navCtrl.push( orderPayPage,{
                data:this.foodList,
                send:this.sendData,
                detail:this.shopData
            } )
        }else if( list.id=='19' ){
            //  开票
            
        }else if( list.id=='20' ){
            //  打印小票
            // &id=订单ID &bid=商家ID &type=1小票2发票 &time= &token= &sign=
            this.shopId = this.shopData.bid; 
            let type = list.type;  
            this.sign_2 = Md5.hashStr( this.orderMsg.id+this.shopId+type+this.timestamp+this.token )
            this.serve.get( '?service=Order.PrintReceipts&id='+this.orderMsg.id+'&bid='+this.shopId
                            +'&type='+type+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_2 )
                            .then(data=>{
                                    console.log( data )
                                    this.resDatas = data;
                                    if( this.resDatas.data==false ){
                                        this.showAlert( this.resDatas.msg )
                                    }
            })
        }else if( list.id=='22' ){
            //  分享
        }
        
    }

    // 弹窗
    showAlert( msg ) {
        let alert = this.alertCtrl.create({
            title: '温馨提示！',
            subTitle: msg,
            buttons: ['确定'],
            cssClass:'alertCss'
        });
        alert.present();
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
