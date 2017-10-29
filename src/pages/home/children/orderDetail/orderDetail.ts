import { Component } from '@angular/core';
import { NavController,ModalController,NavParams } from 'ionic-angular';

// 其他页面
import { ModalPage } from './modal';
import { servePage } from './serve/serve';

// md5
import { Md5 } from "ts-md5/dist/md5";

import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun';
import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';



@Component({
  selector: 'page-orderDetail',
  templateUrl: 'orderDetail.html'
})
export class orderDetailPage {
    resDatas;
    eatNum; //吃饭的人数
    showArray;//订单列表
    time;
    allNum=0;
    allPrice=0;
    freePrice=0;  //优惠的价格
    payMoney:Number;    //  实际支付的
    shopMsg;
    res;
    a;
    orderNumber;//订单编号
    orderStatus;//订单状态
    showAddress=true;//是否显示地址，如果是查看订单详情，就没有地址
    user;//查看订单详情，显示的用户信息
    discountPrice=0;//折后价
    orderMsg;//订单信息

    orders=true;//待接单，默认显示
    accept=false;//已经接受
    done=false;//已经完成
    refuse=false;//已经拒绝
    sendData;
    aaa;
    aa;
    detailShow=false;//根据订单详情来显示的
    sign;
    time_1;
    timestamp;
    token=1;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
                    ) {

                        // 获取当前时间戳
                this.time_1 = new Date();
                this.timestamp = Date.parse( this.time_1 ); 


            this.resDatas = navParams.data;  //接收传过来的数据
            console.log( this.resDatas )    //接收modal传过来的数据
            if( this.resDatas.list ){
                this.showArray = this.resDatas.list.detail; //订单的列表
                this.shopMsg = this.resDatas.list.shop; //店铺的信息
                this.orderMsg = this.resDatas.list.newOrder;//订单的信息

                this.orderNumber = this.orderMsg.order_sn;//订单编号

                this.order_detail();//订单详情的API
                
            }
            
            // console.log( this.showArray )
            // console.log( this.shopMsg )
            // console.log( this.orderMsg )
            
            

            // this.payMoney = this.allPrice-this.freePrice;
            
            this.eatNum = this.resDatas.data;   //就餐人数

            this.time = (new Date()).toLocaleString();  //当前时间

            // 订单详情
            this.res = navParams.data.data;  //接收传过来的数据
            console.log( this.res )
            if( this.res.list ){
                this.a = this.res;
                // console.log( this.a )
                // 店铺信息部分
                this.shopMsg = this.a;
                    console.log( this.shopMsg )
                this.discountPrice = this.shopMsg.discount_total_price;//折后总价
                    // console.log( this.discountPrice )
                    
                this.shopMsg.bname = this.shopMsg.shop_name;//店铺名字
                this.eatNum = Number( this.shopMsg.people_number ) ;//就餐人数
                this.orderNumber = this.shopMsg.order_sn;//订单编号
                this.showAddress = false;// 隐藏地址

                // 数组部分
                let aid = this.a.id;
                // console.log( aid )
                this.sendData = this.a.list[aid]
                console.log( this.a.list[aid] );//订单详情的具体数据
                // console.log( this.sendData )
                
                
                this.user = this.a.list[aid].user;// 用户信息
                this.time = this.pbp.stotime( this.a.list[aid].time ); //订餐时间

                // 判断状态
                if( this.a.list[aid].status=='0' ){
                    this.orderStatus = '订单无效';
                    this.orders = true;
                    this.orders = false;
                }else if( this.a.list[aid].status=='1' ){
                    this.orderStatus = '新订单';
                    this.accept = true;
                    this.orders = false;                    
                }else if( this.a.list[aid].status=='2' ){
                    this.orderStatus = '交易进行中';
                    this.accept = true;
                    this.orders = false;                    
                }else if( this.a.list[aid].status=='3' ){
                    this.orderStatus = '正在付款';
                    this.accept = true;     
                    this.orders = false;                    
                }else if( this.a.list[aid].status=='4' ){
                    this.orderStatus = '订单完成';
                    this.done = true;
                    this.orders = false;                    
                }else if( this.a.list[aid].status=='5' ){
                    this.orderStatus = '商家拒绝';
                    this.refuse = true;
                    this.orders = false;                    
                }else if( this.a.list[aid].status=='6' ){
                    this.orderStatus = '商家接单';
                    this.accept = true;
                    this.orders = false;                    
                }
                
                let array = this.a.list[aid].menu;
                this.showArray = array;
                console.log( this.showArray )
                // 订单详情来的
                for( let m=0;m<this.showArray.length;m++ ){
                    this.showArray[m]['num'] = this.showArray[m]['count'];
                    // this.allPrice = this.allPrice + ( this.showArray[m]['num']*this.showArray[m]['price'] ) ;  //总价
                
                    // this.discountPrice = this.discountPrice + Math.round(this.showArray[m]['discount_price']);//打折价格
                    // console.log( this.discountPrice )
                    // this.freePrice = this.discountPrice;
                    // this.freePrice = Math.round(this.allPrice-this.discountPrice);
                };
                
                
            }

            // 根据店铺首页来的
            for( let i=0;i<this.showArray.length;i++ ){
                
                this.allNum = this.allNum + Math.round( this.showArray[i]['num'] );    //总数量,先取整再相加
                this.allPrice = this.allPrice + ( this.showArray[i]['num']*this.showArray[i]['price'] ) ;  //总价
                this.aa = this.aa + Number( this.showArray[i]['num']*this.showArray[i]['discount_price'] );//打折后的价格
                // this.freePrice = this.allPrice - this.aa;
            }

            this.payMoney = this.allPrice - this.freePrice;   //实际付款

  }

// 订单详情
order_detail(){
    this.sign = Md5.hashStr( this.orderMsg.id+this.timestamp+this.token+this.sign );
    this.serve.get( '?service=Order.OrderInfo&order_id='+this.orderMsg.id+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then(datas=>{
        console.log( datas )
    })
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

    // 进入modal
    openModal(){
        let modal = this.modalCtrl.create( ModalPage,{data:'000'} );
        modal.onDidDismiss(data => {
          // 接收 modal 传过来的数据
        console.log(data);
        this.eatNum = data
        });
        modal.present();
        
    }


    // 进去服务页面
    openServe(){
        this.navCtrl.push( servePage,{
            data:{
                shop:this.shopMsg,
                list:this.showArray,
                sendData:this.sendData,
                newOrder:this.orderMsg
            }
        } )
    }



}
