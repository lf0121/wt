import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ModalController } from 'ionic-angular';

// md5
import { Md5 } from "ts-md5/dist/md5";

// import * as $ from 'jquery';

// 服务
import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';

// import { orderPayPage } from '../orderPay/orderPay'; //订单支付
import { foodCarPage } from '../foodCar/foodCar'; // 美食车
import { securityPage } from '../security/security'; // 食品安全

// 其他modal页面
import { modalpage } from './modal';
import { modalPerpage } from './modalPer';


@Component({
  selector: 'page-shopHome',
  templateUrl: 'shopHome.html'
})
export class shopHomePage {
  items: any;
  saveEd = true;

  chooseArray = ['orderFood','reserveFood','shop','evaluate']
  choose:String = this.chooseArray[0];
  navlist=[
    {
      name:"精品菜单"
    },{
      name:"热销"
    },{
      name:'折扣'
    },{
      name:'饮料'
    },{
      name:'素菜'
    },{
      name:'荤菜'
    }
  ];
  navid = 0;
  choise;
  choiseId = 1;
  chooseType; //选择的菜系
  showFooter = false;
  allNumber = 0;
  showNumber = 0;
  allPrice:any = 0; 
  resDatas;
  res;

  foodList = [
    {
      img:'../assets/images/head.jpg',
      name:'小鸡炖蘑菇',
      sale:'1541',
      price:20.00,
      number:0
    },{
      img:'../assets/images/head.jpg',
      name:'蜜蜡烤翅',
      sale:'10',
      price:25.00,
      number:0
    },{
      img:'../assets/images/head.jpg',
      name:'鸭脖',
      sale:'1853',
      price:35.00,
      number:0
    },{
      img:'../assets/images/head.jpg',
      name:'鸭脖',
      sale:'1853',
      price:35.00,
      number:0
    },{
      img:'../assets/images/head.jpg',
      name:'鸭脖',
      sale:'1853',
      price:35.00,
      number:0
    }
  ];

  // 评价列表
pjList = [];
star = [1,2,3,4,5];
starsnum = 5; //点赞的星星数量
data;
shopHomeData;
time;
timestamp; //时间戳
token = '1';
sign;
sign_1;
local;
dataArray;
workTime;
shopPic;
notice;
plstotime = [];
address;
pjNum;//总评价的数量
inforPic;
foodType; //菜的种类
foodDetail; //具体的菜品
imgUrl = 'http://wtimg.itzlu.com';  //默认的图片地址拼接
n = 0;
m = 0;
// itmes = 0;
// itmes2 = 0;
// temptest  = [];
// temptest2 = [];
bname;
shopImg;
choosePer = true;//  显示选择人数
sendService;
haveFood=true;//显示是否有这类菜品

itmes = 0;//组装数据【所点的菜数据使用】
itmes2 = 0;//组装数据【所点的菜数据使用】
temptest  = [];//组装数据【所点的菜数据使用】
temptest2 = [];//组装数据【所点的菜数据使用】
userId='1';//用户ID;
userName='aaa';//用户名
userPhone='1';//用户手机号
orderPrice;//定金
eatTime;//就餐时间
tableId='1';//桌子ID
eatPerson='1';//就餐人数
remarks='1';//备注
fid;//菜ID:份数，是一个json
foodid;
foodnum;
pid=0;//主订单ID，加菜分享的时候传
orderDetail;//订单详情信息
aCreateOrder;//创建订单
methodType='3';//加餐的途径
// 0.PC收银系统直接点餐,1.App直接下单,2.iPAD直接下单,3.wechat直接下单,4APP扫码点餐,5.wechat扫码点餐,6.App分享【出去别人的下单方式】点餐,7.wechat分享点餐,8.加菜


  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public modalCtrl: ModalController
              
              ) {

    // 接收的数据
    this.resDatas = navParams.data;  //接收传过来的数据
        console.log( this.resDatas )
    this.shopHomeData = this.resDatas.item;
        console.log(this.shopHomeData);

        this.shopImg = this.shopHomeData.image;

                // 收藏页面过来
                if( this.resDatas.save==1 ){
                    this.saveEd = false;
                }

                if( this.shopHomeData.name ){
                      this.bname = this.shopHomeData.name;
                }else if( this.shopHomeData.bname ){
                      this.bname = this.shopHomeData.bname;
                }

                if( this.shopHomeData.bid ){
                      this.shopHomeData.bid = this.shopHomeData.bid
                }else if( this.shopHomeData.id ){
                      this.shopHomeData.bid = this.shopHomeData.id;
                }

                // 获取当前时间戳
                this.time = new Date();
                this.timestamp = Date.parse( this.time ); 

                // Md5 签名
                this.sign = Md5.hashStr( this.shopHomeData.bid+this.timestamp+this.token )
                // console.log( 'Md5 签名...'+this.sign )


          
          // 店铺主页详情
          // http://wtapi.itzlu.com/newzb/?service=Bus.ShopInfo&bid= &time= &token= &sign=
          this.serve.get('?service=Bus.ShopInfo&bid='+ this.shopHomeData.bid +'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then( datas=>{
              this.data = datas;
              this.dataArray = this.data.data;
              // console.log( this.dataArray )
              this.workTime = this.dataArray[0].dotime; //营业时间
              this.shopPic = this.dataArray[0].images;  //  店铺图片
              for( let i=0;i<this.shopPic.length; i++ ){
                this.shopPic[i]['image'] = this.imgUrl+this.shopPic[i]['image'];
              }
              // console.log( this.shopPic )

              this.notice = this.dataArray[0].announcement; //公告
              this.address = this.dataArray[0].gps_address;   //地址

              this.inforPic = this.dataArray[0].archives; //档案图片
              // console.log( this.inforPic )
          } )

          // 店铺菜品
          // http://wtapi.itzlu.com/newzb/?service=Bus.OrderDishes&bid= &time= &token= &sign=
          this.serve.get('?service=Bus.OrderDishes&bid='+ this.shopHomeData.bid +'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign ).then( datas=>{
              this.dataArray = datas;

              this.foodType = this.dataArray.data;
              console.log( this.foodType )   //菜的种类

              this.chooseType = this.foodType[0]['name']; //右边显示的首选的种类
              this.foodDetail = this.foodType[0]['foods'];  //右边默认显示的现在的

              

              for( let i=0; i<this.foodType.length; i++ ){
                    for( let aa=0; aa<this.foodType[i]['foods'].length; aa++ ){
                        this.foodType[i]['foods'][aa]['num'] = 0;
                        this.foodType[i]['foods'][aa]['image'] = this.imgUrl + this.foodType[i]['foods'][aa]['image'];
                    } 
              }


          } )

          // 商家评论列表
          //http://wtapi.itzlu.com/newzb/?service=CommentAdmin.Comment&bid= &time= &token= &sign=
          this.serve.get('?service=CommentAdmin.Comment&bid='+this.shopHomeData.bid+'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign).then(datas=>{
              // console.log( datas )
              this.resDatas = datas;
              this.pjList = this.resDatas.data;
              // console.log( this.pjList )
              this.pjNum = this.pjList.length; //评论数量

              for( let m=0;m<this.pjList.length;m++ ){
                  // 图片地址拼接
                  this.pjList[m]['images'] = this.imgUrl+this.pjList[m]['images'];

                  // 时间戳转换
                  let time= this.pbp.stotime(this.pjList[m].add_time);
                  this.plstotime.push(time);
              }

              // console.log( this.plstotime )
          })
            




  }

// 预定订单接口
// ?service=Order.ReserveOrder&bid=商家ID &uid=用户ID &booked_username=用户名 
// &mobile= &order_price= &booked_time= &table_id= &people_number= &remark= &time= &token= &token= &sign=
sublimits(){
    console.log('提交预订订单');
    this.sign_1 = Md5.hashStr( this.shopHomeData.bid+this.userId+this.userName
                              +this.userPhone+this.orderPrice+this.eatTime
                              +this.tableId+this.eatPerson+this.remarks
                              +this.timestamp+this.token );

    this.serve.get( '?service=Order.ReserveOrder&bid='+this.shopHomeData.bid
                    +'&uid='+this.userId+'&booked_username='+this.userName
                    +'&mobile='+this.userPhone+'&order_price='+this.orderPrice
                    +'&booked_time='+this.eatTime+'&table_id='+this.tableId
                    +'&people_number='+this.eatPerson+'&remark='+this.remarks
                    +'&time='+this.timestamp+'&token='+this.token+'&sign='+this.sign_1 )
                    .then(datas=>{
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


  // 加
  addNumber(i,data){

     //组装数据【所点的菜数据】    start
    let aaa = 0;
    for(let ii = 0;ii < this.temptest2.length;ii++){
        if(this.temptest2[ii]== data.id ){
          this.temptest[ii] = data;
          aaa = 1;
        }
    }
    if(!aaa){
        this.temptest[this.itmes]   = data;//标记存的值
        this.temptest2[this.itmes2] = data.id ;//标记存的ID
        this.itmes = this.itmes+1;
        this.itmes2 = this.itmes2+1;
    }
     //组装数据【所点的菜数据】    stop
 
     console.log(this.temptest);  //购物车的数据


    this.foodDetail[i]['num'] += 1;
    let Num_price = Number( this.foodDetail[i]['price'] );  //每一个的单价

    // console.log(i);
    console.log(data);
    // this.sendService = data;
    // console.log( this.sendService )
    
    for(let ii = 0;ii < this.temptest2.length;ii++){
      if(this.temptest2[ii] == i){
        this.temptest[this.itmes] = data;
      }
    }
    
    // 总价
    // Number((a+b).toFixed(2))  处理double小数相加 出现多位小数的问题
    this.allPrice =Number( ( this.n + Num_price ) ).toFixed(2);
    // console.log( this.allPrice )
    
    this.n = this.n + Num_price;
    // 总数
    this.allNumber = ++this.m;
    this.m = this.m;   
    // console.log( this.addNumber )


    // 本地储存
    let foodCar={
      'num':this.addNumber,
      'price':this.allPrice
    };
    this.local = window.localStorage;
    this.local.setItem('foodCar',JSON.stringify( foodCar) )    
    console.log( this.local.getItem('foodCar') )
    
  }

  // 减
  removeNumber(i,data){
    let Num_price   = Number( this.foodDetail[i]['price'] );//标签上面的价格
   if ( (this.foodDetail[i]['num']-1) >=0) {
    this.allPrice   = Number( (this.n - Num_price) ).toFixed(2);//赋值总价
    this.n          = this.n - Num_price;
    this.allNumber  = --this.m;//赋值总价上面的红包标记
    this.foodDetail[i]['num'] = this.foodDetail[i]['num']-1;//减标签后面的数值


    //组装数据【所点的菜数据】    start
    let aaa = 0;
    for(let ii = 0;ii < this.temptest2.length;ii++){
      if(this.temptest2[ii]== data.id ){
        this.temptest[ii] = data;
        aaa = 1;
        if(!data.num){
          console.log('ooo');
          this.temptest.splice(ii,1);
          this.temptest2.splice(ii,1);
          this.itmes = this.itmes-1;
          this.itmes2 = this.itmes2-1;
        }          
      }
    }
    //组装数据【所点的菜数据】    stop
    console.log(this.temptest);


   }

  }

  

enterFoodCar(item){
  console.log( '进入美食车' )
  item = this.temptest;
  console.log( item )
  
  this.navCtrl.push( foodCarPage,{
    data:item
  } )
}

// 查看店铺 商家的图片
showImg(img,index){
  
  console.log( img )
  let modal = this.modalCtrl.create( modalpage,{ data:img.image } );
  modal.onDidDismiss(data => {
    // 接收 modal 传过来的数据
    console.log('接收modal传过来的数据...'+data);
    if( typeof data=='string' ){

    }
  });
  modal.present();
}

// 查看评论列表里边的图片
showPjImg( img ){
  let modal = this.modalCtrl.create( modalpage,{data:img} );
  modal.onDidDismiss(data => {
    // 接收 modal 传过来的数据
    console.log('接收modal传过来的数据...'+data);
    if( typeof data=='string' ){

    }
  });
  modal.present();
}

// 查看商家安全信息
enterSecurity( inforPic ){
  console.log( inforPic )
  this.navCtrl.push( securityPage,{
    data:inforPic
  } )
}
  

save(){
  this.saveEd = !this.saveEd;
}
// 解析字符串
GetRequest(text) { 
	var theRequest = new Object();
	let strs = text.split("&");
	for(var i = 0; i < strs.length; i ++) { 
    theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]); 
		// theRequest[strs[i].split("=")[0]]=encodeURIComponent(strs[i].split("=")[1]); 
    
	}
	return theRequest; 
}

// 点击支付  跳转到选择人数的页面，再进行跳转到支付页面
openPay( allPrice ){
  console.log(this.temptest);  //购物车的数据
  this.fid = '{';
  let a = 1;
  for( let m=0;m<this.temptest.length;m++ ){
      this.foodid = this.temptest[m]['id'];
      this.foodnum = this.temptest[m]['num'];
      if(a){
        this.fid += '"'+this.foodid+'":'+this.foodnum;
        a = 0;
      }else{
        this.fid += ',"'+this.foodid+'":'+this.foodnum;
      }
  }
  this.fid += '}';
  this.fid = encodeURIComponent(this.fid);
  
  // 点击结算，创建订单
  // &bid=商家ID &uid=用户ID &fid={菜ID:份数} &pid=主订单ID，加菜，分享时传 &mobile= 
  // &table_id=桌子ID &people_number=就餐人数 &remark=备注 &divice_status=3 &time= &token= &sign
let sign_2 = Md5.hashStr( this.shopHomeData.bid+this.userId+this.fid+this.pid+this.userPhone
                          +this.tableId+this.eatPerson+this.remarks+this.methodType+this.timestamp+this.token );

this.serve.get2( '?service=Order.CreateOrder&bid='+this.shopHomeData.bid
                +'&uid='+this.userId+'&fid='+this.fid+'&pid='+this.pid
                +'&mobile='+this.userPhone+'&table_id='+this.tableId
                +'&people_number='+this.eatPerson+'&remark='+this.remarks
                +'&divice_status='+this.methodType+'&time='+this.timestamp
                +'&token='+this.token+'&sign='+sign_2 ).then(datas=>{
                    this.aCreateOrder = datas;
                    this.orderDetail = this.aCreateOrder.data;//订单详情信息
                        console.log( this.orderDetail )            
            })  

// 进入modal添加人数页面
setTimeout( ()=>{
    let datas={
      shop:this.shopHomeData,
      detail:this.temptest,
      newOrder:this.orderDetail
    }
    let modal = this.modalCtrl.create( modalPerpage,{data:datas} );
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
    this.choosePer = true;
  },500 )

}

  // 选择种类
  navclick(i,item){
      this.navid = i;
      this.choiseId = this.navid+1;
      this.chooseType = item.name;
      console.log( item )
      this.foodDetail = item.foods;
      // if( this.foodDetail.length==0 ){
      //     this.haveFood = !this.haveFood;
      // }else if( this.foodDetail.length>0 ){
      //     this.foodDetail = item.foods;
      // }
  }


}
