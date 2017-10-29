import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ModalController,ToastController    } from 'ionic-angular';

// 服务
import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';

import { Md5 } from "ts-md5/dist/md5";


// 其他页面
import { modalPage } from './modal-page';

import { shopHomePage } from '../shopHome/shopHome'; //店铺首页

@Component({
  selector: 'page-searchResult',
  templateUrl: 'searchResult.html'
})
export class searchResultPage {

  // 地图变量
  cityData: any[]; //城市数据
  cityName = '全城'; //初始化城市名
  area:string;

  keyWords:String; //热搜关键词
  resData; //接收请求的数据
  searchData;   //搜索的结果

  lng = '106.49860746442921'; //经度
  lat = '29.541932639272208'; //纬度

  imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接

  // 申明变量
  receive;
  classification = '全部分类';
  foodGroup = [];

  searchQuery: string = '';
  items: string[];
  position;

  local; //本地储存
  token = '1';
  timestamp;
  time;
  sign;

  shopId; //商家ID
  bigCity;  //省
  smallCity;//市
  district;//区县
  sign_2;
  key
  

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController

              ) {

                // this.initializeItems();  //搜索框

        this.receive = navParams.data;  //接收的数据
        console.log( this.receive.data )


        this.key = this.receive.data;  // 输入框传关键词 显示数据
        this.shopId = this.receive.data.id;       //传ID显示数据   

        // 地图
        this.setCityPickerData();

        // 热搜结果
        // 这个是根据关键词来显示的内容   用于搜索框
        if( typeof this.key=='string' ){
            if( this.key.length>=0 ){
                  this.keyWords = this.key;
                  this.serve.get( '?service=Search.Search&keywords='+this.keyWords+'&lng='+this.lng+'&lat='+this.lat ).then( datas=>{
                        this.resData = datas;
                            console.log( this.resData )
                        this.searchData = this.resData.data;
                            // console.log( this.searchData )
                        if( this.searchData==false ){
                            // toast提示框
                            this.presentToast( this.resData.msg );
                        }else{
                            for( let i=0;i<this.searchData.length;i++ ){
                              this.searchData[i]['image'] = this.imgUrl + this.searchData[i]['image'];  //图片地址拼接
                              this.searchData[i]['distance'] = Math.round( this.searchData[i]['distance'] );  // 距离用四舍五入
                            }
                            console.log( this.searchData )
                        }
                  } )
            }
        }

        // 根据外部传来的  是根据ID 来显示的列表
        if( this.shopId ){
              this.serve.get('?service=Bus.ShopList&type_id='+this.shopId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_2).then(data=>{
                    this.resData = data;
                    console.log( this.resData )
                    this.searchData = this.resData.data;  //array
                    for( let m=0;m<this.searchData.length;m++ ){
                        this.searchData[m]['image'] = this.imgUrl + this.searchData[m]['image'];
                    }
                    console.log( this.searchData )
              })
        }
            
          
                


        // 获取当前时间戳
        this.time = new Date();
        this.timestamp = Date.parse( this.time ); 

        this.sign = Md5.hashStr( this.token+this.timestamp )
        

        // 自己选择分类 这个数据是传给modal页面的 让modal显示可以选择的项目
        // http://wtapi.itzlu.com/newzb/?service=Home.Bus_type&token= &time= &sign=
        this.serve.get('?service=Home.Bus_type&token='+this.token+'&time='+this.timestamp+'&sign='+this.sign ).then( datas=>{
            this.resData = datas;
            this.foodGroup = this.resData.data;
            console.log( this.foodGroup )
        } )

        this.sign_2 = Md5.hashStr( this.shopId+this.timestamp+this.token )
        
        

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

  // 显示弹出提示
  showAlert(title,mes) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mes,
      buttons: ['确定']
    });
    alert.present();
  }


  // 输入关键词
  onInput(keyWords){
    console.log(keyWords)
    if( typeof this.keyWords=='string' ){
      if( this.keyWords.length>=0 ){
            this.serve.get( '?service=Search.Search&keywords='+this.keyWords+'&lng='+this.lng+'&lat='+this.lat ).then( datas=>{
                  this.resData = datas;
                      console.log( this.resData )
                  this.searchData = this.resData.data;
                      // console.log( this.searchData )
                  if( this.searchData==false ){
                      // toast提示框
                      this.presentToast( this.resData.msg );
                  }else{
                      for( let i=0;i<this.searchData.length;i++ ){
                        this.searchData[i]['image'] = this.imgUrl + this.searchData[i]['image'];  //图片地址拼接
                        this.searchData[i]['distance'] = Math.round( this.searchData[i]['distance'] );  // 距离用四舍五入
                      }
                      console.log( this.searchData )
                  }
            } )
      }
  }
        
    
}


  // 获取地区数据
  setCityPickerData(){
    this.serve.getCitiesData().then( data => {
        this.cityData = data;
      });
  }
  // 城市被改变时触发的事件
  cityChange(event){
    // console.log(event);
    this.position = event;
    console.log( this.position )

    if( typeof event['region'].text=='string' ){
      this.cityName = event['region'].text;
      if( event['region'].text=='市辖区' ){
        this.cityName = event['city'].text
      }
    }
    

  }

  // 事件
  click_1(){
    let modal = this.modalCtrl.create( modalPage,{data:this.foodGroup} );
    modal.onDidDismiss(data => {
      // 接收 modal 传过来的数据
      console.log(data);

      this.classification = data.name;  //  点击显示的选择的分类的

      // 根据modal页面选择的分类显示的内容  这边主要接收的是ID
      // ?service=Bus.ShopList&type_id='商家类型ID(可选) &province=省(可选) &city=市(可选) &district=区(可选) &time= &token= &sign= 
      this.shopId = data.id;
      this.serve.get('?service=Bus.ShopList&type_id='+this.shopId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_2).then(data=>{
            this.resData = data;
            this.searchData = this.resData.data;  //array
            for( let m=0;m<this.searchData.length;m++ ){
                this.searchData[m]['image'] = this.imgUrl + this.searchData[m]['image'];
            }
            console.log( this.searchData )
      })



    });
    modal.present();
  }

  click_2(){
    this.setCityPickerData();
  }


  // 跳转其他页面
  openSearchResult(){
    // this.navCtrl.push(  );
  }
  enterShopHome(items){
    console.log( items )
    this.navCtrl.push( shopHomePage,{
      item:items
    } )
  }

  // toast弹框
  presentToast( mes ) {
    const toast = this.toastCtrl.create({
      message: mes,
      duration: 2000,
      position: 'top',
      cssClass:'toastAlert'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  // 下拉刷新
  doRefresh(refresher){
    console.log( refresher )

    setTimeout(()=>{
      refresher.complete();
    },2000)    
  }
  

}
