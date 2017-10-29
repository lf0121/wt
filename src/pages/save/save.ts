import { Component } from '@angular/core';
import { NavController,NavParams,AlertController  } from 'ionic-angular';

// 服务
import 	{ PublicfunProvider } from '../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../providers/httpfun/httpfun';

// md5
import { Md5 } from "ts-md5/dist/md5";

import { shopHomePage } from '../home/children/shopHome/shopHome'

@Component({
  selector: 'page-save',
  templateUrl: 'save.html'
})
export class savePage {

  resDatas;
  userId=1;//用户ID
  time;
  timestamp;
  sign;
  token=1;
  res;
  saveArray = [];//收藏的列表
  imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
  noneSave:boolean;
  

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,

              ) {

              this.resDatas = navParams.data;  //接收传过来的数据
              console.log( this.resDatas )

              this.time = new Date();
              this.timestamp = Date.parse( this.time ); 
              this.sign = Md5.hashStr( this.userId+this.timestamp+this.token )   
              
              // ?service=User.GetCollectList&uid= &time= &token= &sign=
              this.serve.get('?service=User.GetCollectList&uid='+this.userId+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then(datas=>{
                  console.log( datas );
                  this.res = datas;
                  
                  if( this.res.data.length>0 ){
                      this.saveArray = this.res.data;
                      this.noneSave = false;
                  }else if( this.saveArray.length=0 ){
                      this.noneSave = true;
                  }


                  for( let i=0;i<this.saveArray.length;i++ ){
                      this.saveArray[i]['image'] = this.imgUrl + this.saveArray[i]['image'];
                  }
                  
              })

  }

  showSave( item,i ){
    console.log( item )
    this.navCtrl.push( shopHomePage,{
      item:item,
      save:1
    } )
  }

  deleteItem( item,i ){
    console.log( item )
    this.saveArray.splice( i,1 )
  }

  

}
