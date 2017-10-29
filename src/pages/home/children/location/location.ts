import { Component } from '@angular/core';
import { NavController,NavParams,AlertController  } from 'ionic-angular';

// 服务
import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';

// md5
import { Md5 } from "ts-md5/dist/md5";

import { HomePage } from '../../home'


@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class locationPage {
    sign;
    cityId;
    token;
    timestamp;
    time;
    resData;
    ArrayData;
    showArray:any = [];

    cityName='请选择'; //选择的城市的名称
    secName='请选择';
    thereName='请选择';
    sendId;//发送到首页的ID
    sendName;
    city;

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,

              ) {

                this.time = new Date();
                this.timestamp = Date.parse( this.time ); 

                // 城市定位
                this.sign = Md5.hashStr( this.cityId+this.token+this.timestamp )
                
                this.locationCity( this.cityId )

  }

// 城市定位
locationCity( id ){
    this.serve.get2('?service=NearbyBus.GpsLocalize&id='+id+'&token='+this.token+'&time='+this.timestamp+'&sign='+this.sign).then(data=>{
        this.resData = data;
        this.ArrayData = this.resData.data;
            console.log( this.ArrayData )
        if( this.ArrayData.length>0 ){
            this.showArray = this.ArrayData;
        }
        
    })
}
// 选择城市
chooseCity( list ){
        console.log( list )
    this.locationCity( list.id )
    if( list.parent_id=='0' ){
        this.cityName = list.name;
    }else if( list.parent_id !='0' ){
        if( list.name != '市辖区' && list.name != '县' && list.name != '市辖县' ){
            // this.secName = list.name;
            if( list.parent_id.length <=3 ){
                this.secName = list.name;
            }
            if( list.parent_id >=4 ){
                this.thereName = list.name;
            }
        }
    }

    // 需要传出去的内容
    this.sendId=list.id;
    this.sendName = list.name;
    if( list.parent_id=='0' ){
        this.city = 'province'
    }else if( list.parent_id  != '0' ){
        this.city = 'city'
    }
}

// 确定
sure(){
    this.navCtrl.push( HomePage,{
        data:{
            id:this.sendId,
            name:this.sendName,
            city:this.city
        }
    } )
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
