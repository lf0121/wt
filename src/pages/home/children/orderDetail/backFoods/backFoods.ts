import { Component } from '@angular/core';
import { NavController,AlertController,NavParams,ModalController } from 'ionic-angular';

// md5
import { Md5 } from "ts-md5/dist/md5";

// 服务
import 	{ PublicfunProvider } from '../../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../../providers/httpfun/httpfun';

import { MPage } from './modal';





@Component({
  selector: 'page-backFoods',
  templateUrl: 'backFoods.html'
})
export class backFoodsPage {
    
    imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
    resDatas;
    time;
    showArray=[];
    eatNum;
    allNum=0;
    allPrice=0;
    payMoney:Number;
    freePrice=0;
    sendData;
    detailData;
    user;
    orderNumber;
    sign;
    time_1;
    token=1;
    timestamp;

    orderMsg;//订单详情信息

    constructor(public navCtrl: NavController,
                public pbp:PublicfunProvider,
                public serve:HttpfunProvider,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
        
            ) {
                this.time = (new Date()).toLocaleString();  //当前时间     
                
                this.time_1 = new Date();
                this.timestamp = Date.parse( this.time_1 ); 
                

                this.resDatas = navParams.data;  //接收传过来的数据
                console.log( this.resDatas )

                // 订单详情信息
                if( this.resDatas.newOrder ){
                    this.orderMsg = this.resDatas.newOrder;
                    this.orderNumber = this.orderMsg.order_sn;
                }

                this.showArray = this.resDatas.data;//数组列表
                // console.log( this.showArray )

                if(  this.resDatas.send ){
                    this.sendData = this.resDatas.send;//订单详情信息
                    // console.log( this.sendData )
                    this.time = this.pbp.stotime( this.sendData.time ); //订餐时间    
                    this.user = this.sendData.user;  //用户信息，电话 
                }
                if( this.resDatas.detail.order_sn ){
                    this.detailData = this.resDatas.detail;//订单详情信息
                    // console.log( this.detailData )
                    this.orderNumber = this.detailData.order_sn;
                    this.eatNum = Number( this.detailData.people_number );
                }         

                for( let i=0;i<this.showArray.length;i++ ){
                    // console.log( this.showArray )
                    this.allNum = this.allNum + Math.round(this.showArray[i]['num']);    //总数量
                    this.allPrice = this.allPrice + ( this.showArray[i]['num']*this.showArray[i]['price'] ) ;  //总价
                    if( this.showArray[i]['discount_price'] ){
                        this.freePrice = this.freePrice + Math.round(this.showArray[i]['discount_price']);
                    }else{
                        this.freePrice = 0;
                        
                    }
                    
                }
                
                this.payMoney = this.allPrice-this.freePrice;

                
    }

    
    // 进入modal
    openModal(){
        let modal = this.modalCtrl.create( MPage,{data:'000'} );
        modal.onDidDismiss(data => {
          // 接收 modal 传过来的数据
        console.log(data);
            this.eatNum = data;
        });
        modal.present();
        
    }

    // 删除
    deleteList( i,item ){
        console.log( item )
        let foodId = item.id;//菜ID
        let type = 0;//类型0为删除
        let foodNum = item.num;//菜的数量

        let sign_delete = Md5.hashStr( foodId+type+foodNum+this.timestamp+this.token );
        // 退菜的API
        this.serve.get('?service=Order.RetreatFood&food_id='+foodId+'&type='+type+'&count='
                        +foodNum+'&time='+this.timestamp+'&token='+this.token+'&sign='+sign_delete )
                        .then(datas=>{
                                console.log( datas )
                                this.resDatas = datas;
                                if( this.resDatas.data==true ){
                                    // 删除列表菜，改变列表信息，总价，数量
                                    this.showArray.splice( i,1 );    // 删除选中的一列    
                                    this.allNum = this.allNum - item.num;   // 购物车的总数量
                                    this.allPrice = this.allPrice - Number(item.price * item.num);  // 购物车的总价格  
                                    this.payMoney = this.allPrice - this.freePrice;  
                                }else if( this.resDatas.data==false ){
                                    this.showAlert( this.resDatas.msg )
                                }
        });

        
        
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


    // 编辑修改人数
    editPeople( list,i ) {
        const alert = this.alertCtrl.create({
            title: '请修改份数',
            inputs:[
                {
                    name: 'number',
                    placeholder: '请输入份数'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        if (data.number) {
                                console.log( data.number )
                            let a=this.showArray[i]['num']; //储存原来的分数
                            this.showArray[i]['num'] = data.number; //修改的每一条的数量，现在的分数
                            this.allNum = this.allNum+ Number( this.showArray[i]['num']-a );    //总数改变

                            this.allPrice = this.allPrice + ( (this.showArray[i]['num']-a) * this.showArray[i]['price'] ) ;  //总价

                            this.payMoney = this.allPrice-this.freePrice;

                            // 修改数量
                            let foodId = list.id;
                            let type = 1;//0是删除，1是修改数量
                            let foodNum = data.number;//菜的数量
                            let sign_edit = Md5.hashStr( foodId+type+foodNum+this.timestamp+this.token );
                            // 修改数量
                            this.serve.get('?service=Order.RetreatFood&food_id='+foodId
                                            +'&type='+type+'&count='+foodNum+'&time='
                                            +this.timestamp+'&token='+this.token+'&sign='+sign_edit )
                                            .then( datas=>{
                                                    console.log( datas );
                            } )
                
                        } else {
                            return false;
                        }
                    }
                }
            ],
            cssClass:'editPeople'
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
