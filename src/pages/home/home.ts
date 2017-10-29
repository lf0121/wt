/// <reference path='../../app/wechat.d.ts' />
console.log( wx )

import { Component,ViewChild } from '@angular/core';
import { NavController,NavParams,AlertController  } from 'ionic-angular';

// md5
import { Md5 } from "ts-md5/dist/md5";

// 服务
import 	{ PublicfunProvider } from '../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../providers/httpfun/httpfun';

// 子页面
import { hotSearchPage } from './children/hotSearch/hotSearch'; //热搜
import { searchResultPage } from './children/searchResult/searchResult'; //热搜结果
import { shopHomePage } from './children/shopHome/shopHome'; //店铺首页
import { locationPage } from './children/location/location'; // 定位页面
import { noticePage } from './children/notice/notice';  // 公告信息

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('ionSlides') slides;
  // banner图片
  bannerImg = [];
  // 菜名
  foodGroup = [];
  notice; // 公告
  recommend; //推荐菜品
  recOneName;
  recOnePrice;
  recOneImg;
  recTwoName;
  recTwoPrice;
  recTwoImg;
  recThereName;
  recTherePrice;
  recThereImg;
  recFourName;
  recFourPrice;
  recFourImg;
  recFiveName;
  recFivePrice;
  recFiveImg;
  recSixName;
  recSixPrice;
  recSixImg;
  time;
  token = '1';
  timestamp; //当前时间戳
  sign;
  sign_2;
  sign_3;
  lenth;
  len;
  data;
  nearShop;
  resData; //请求的数据
  imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
  lng = '106.49860746442921'; //经度
  lat = '29.541932639272208'; //纬度
  cityId;   //城市ID，如果没有 代表省级
  city;
  res;//接收的数据
  localAddress='重庆市';
  localPosition;
  haveData = true;//显示附近有没有店铺
 

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,

              ) {
            this.res = navParams.data;  // 接收传过来的数据
            console.log( this.res )
            this.localPosition = this.res.data
            
            if( this.localPosition ){
                this.localAddress = this.localPosition.name;
            }

            // this.app.getRootNav().push(nextPage); // 从根页面跳转

            // 获取当前时间戳
            this.time = new Date();
            this.timestamp = Date.parse( this.time ); 
              // console.log( '当前时间戳...'+this.timestamp );
            
            // Md5 签名
            this.sign = Md5.hashStr( this.token+this.timestamp )
                // console.log( 'Md5 签名...'+this.sign )
              
            // 菜系
            // http://wtapi.itzlu.com/newzb/?service=Home.Bus_type&token= &time= &sign=
            this.serve.get('?service=Home.Bus_type&token='+this.token+'&time='+this.timestamp+'&sign='+this.sign ).then( datas=>{
                  // console.log( datas )
                this.resData = datas;
                this.foodGroup = this.resData.data;
                // console.log( this.foodGroup )
                this.len = this.foodGroup.length;
                for( let i=0; i<this.foodGroup.length; i++ ){
                    this.foodGroup[i]['image'] = this.imgUrl +'/images/'+ this.foodGroup[i]['image'];
                }

                
            } )

            // banner 公告 推荐
            // http://wtapi.itzlu.com/newzb/?service=Home.Index&token= &time= &sign=
            this.serve.get('?service=Home.Index&token='+this.token+'&time='+this.timestamp+'&sign='+this.sign ).then( datas=>{
                  // console.log( datas );
                this.resData = datas;
                let data = this.resData.data;
                // console.log( data )

                // banner
                this.bannerImg = data.banner;
                this.lenth = this.bannerImg.length;
                  // console.log( this.bannerImg )
                for( let i=0; i<this.lenth; i++ ){
                  this.bannerImg[i]['image'] = this.imgUrl+this.bannerImg[i]['image'];
                }

                //公告
                this.notice = data.notice;  

                // 推荐菜品
                this.recommend = data.recommended;
                for( let i=0; i<this.recommend.length; i++ ){
                  this.recommend[i]['image'] = this.imgUrl+this.recommend[i]['image'];
                }
                  // console.log( this.recommend )

                this.recOneName = this.recommend[0].name;
                this.recOnePrice = this.recommend[0].price;
                this.recOneImg = this.recommend[0].image;

                this.recTwoName = this.recommend[1].name;
                this.recTwoPrice = this.recommend[1].price;
                this.recTwoImg = this.recommend[1].image;

                this.recThereName = this.recommend[2].name;
                this.recTherePrice = this.recommend[2].price;
                this.recThereImg = this.recommend[2].image;

                this.recFourName = this.recommend[3].name;
                this.recFourPrice = this.recommend[3].price;
                this.recFourImg = this.recommend[3].image;

                this.recFiveName = this.recommend[4].name;
                this.recFivePrice = this.recommend[4].price;
                this.recFiveImg = this.recommend[4].image;

                this.recSixName = this.recommend[5].name;
                this.recSixPrice = this.recommend[5].price;
                this.recSixImg = this.recommend[5].image;

            } )


            // Md5 签名
            this.sign_2 = Md5.hashStr( this.lng+this.lat+this.token+this.timestamp )
            // 附近的商家
            // http://wtapi.itzlu.com/newzb/?service=NearbyBus.GetBusLngLat&lng= &lat= &token= &time= &sign=
            this.serve.get( '?service=NearbyBus.GetBusLngLat&lng='+ this.lng +'&lat='+ this.lat +'&token='+ this.token +'&time='+ this.timestamp +'&sign='+this.sign_2 ).then( datas=>{
                // console.log( datas )
                this.data = datas;
                this.nearShop = this.data.data;

                for( let i=0; i<this.nearShop.length; i++ ){
                    this.nearShop[i]['image'] = this.imgUrl+this.nearShop[i]['image'];
                    this.nearShop[i]['distance'] = Math.round( this.nearShop[i]['distance'] );  // 距离用四舍五入
                }

                console.log( this.nearShop )

            } )

            // 城市定位，附近的商家
            if( this.localPosition ){
                this.cityId = this.localPosition.id;
                this.city = this.localPosition.city;

                this.sign_3 = Md5.hashStr( this.cityId+this.city+this.token+this.timestamp )
                // ?service=NearbyBus.GpsLocalizeBus&city_id= &city= &token= &time= &sign=
                this.serve.get('?service=NearbyBus.GpsLocalizeBus&city_id='+this.cityId+'&city='+this.city+'&token='+this.token+'&time='+this.timestamp+'&sign='+this.sign_3).then(data=>{
                    // console.log( data )
                    this.resData = data;
                    if( this.resData.data ){
                        this.nearShop = this.resData.data;
                        for( let i=0; i<this.nearShop.length; i++ ){
                            this.nearShop[i]['image'] = this.imgUrl+this.nearShop[i]['image'];
                            // this.nearShop[i]['distance'] = Math.round( this.nearShop[i]['distance'] );  // 距离用四舍五入
                        }
                    }else if( !this.resData.data ){
                        // this.nearShop = [];
                        this.haveData = false;
                    }
                    
                })
            }
            
            
            

  }

  // banner自动播放
  autoPlay(){
    this.slides.startAutoplay();
  }



  
  // 页面跳转
  openHotSearch(){
    this.navCtrl.push( hotSearchPage );
  }
  openSearchResult( data ){
    this.navCtrl.push( searchResultPage,{
      data:data
    } );    
  };

  // 进入店铺主页
  openShopHome(data){
    console.log( data )

    this.navCtrl.push( shopHomePage,{
      item:data
    } )
  };

  // 查看公告信息
  lookNotice(i,item){
    console.log( item )
    this.navCtrl.push( noticePage );
  }


  // 进入定位页面
  enterLocation(){
    this.navCtrl.push( locationPage );
  }
  

// 进入页面 显示tabs
ionViewDidEnter() {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'flex';
          });
      }
}




}
