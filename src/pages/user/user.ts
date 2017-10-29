import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

// 服务
import 	{ PublicfunProvider } from '../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../providers/httpfun/httpfun';

// md5
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class userPage {
  time;
  timestamp;
  sign;
  token=1;
  userId=1;//用户ID
  name;//用户名，可选
  birthday;//生日，可选
  sexArray=[1,2,3]
  sex=this.sexArray[2];//性别，可选，1女2男3保密
  phone;//座机，可选
  email;//邮箱，可选
  signature;//个人签名，可选
  avatar;//个人头像，可选

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {


              this.time = new Date();
              this.timestamp = Date.parse( this.time ); 
              this.sign = Md5.hashStr( this.userId+this.name+this.birthday+this.sex+this.phone+this.email+this.signature+this.avatar+this.timestamp+this.token )   

// ?service=User.SetUserInfos&uid=用户ID &name=可选 &birthday=可选 &sex=可选 &line_phone=可选 &email=可选 &signature=可选 &image=可选 &time= &token= &sign=
              this.httpServe();
  
  }

httpServe(){
    this.serve.get2('?service=User.SetUserInfos&uid='+this.userId
                    +'&name='+this.name+'&birthday='+this.birthday
                    +'&sex='+this.sex+'&line_phone='+this.phone
                    +'&email='+this.email+'&signature='+this.signature
                    +'&image='+this.avatar+'&time='+this.timestamp
                    +'&token='+this.token+'&sign='+this.sign )
                    .then(datas=>{
                          console.log( datas )
                          


    })
}







// 进入页面 隐藏tabs
//   ionViewDidEnter(){
//     let elements = document.querySelectorAll(".tabbar");
//     if (elements != null) {
//         Object.keys(elements).map((key) => {
//             elements[key].style.display = 'none';
//         });
//     }   
//   }
  
//   // 退出页面 显示tabs
//   ionViewWillLeave() {
//       let elements = document.querySelectorAll(".tabbar");
//       if (elements != null) {
//           Object.keys(elements).map((key) => {
//               elements[key].style.display = 'flex';
//           });
//       }
//   }

}
