import { Component } from '@angular/core';
import { NavController,NavParams,AlertController  } from 'ionic-angular';

// 服务
import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';

// 其他页面
import { searchResultPage } from '../searchResult/searchResult'; //热搜结果

@Component({
  selector: 'page-hotSearch',
  templateUrl: 'hotSearch.html'
})
export class hotSearchPage {
  // 申明变量
  keyWord = [
    {
      name:'火锅'
    },{
      name:'川菜'
    },{
      name:'湘菜'
    },{
      name:'粤菜'
    },{
      name:'麻辣烫'
    }
  ];
  default = [
    {name:'暂无热门搜索'}
  ]
  searchWord:String;
  resData;  //  请求的数据
  message;

  constructor(public navCtrl: NavController,
              public pbp:PublicfunProvider,
              public serve:HttpfunProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams,

              ) {

              // 热搜词
              this.serve.get2('?service=Search.GetHotSearch').then( data=>{
                  console.log( data )
                  this.resData = data;
                  if( this.resData.data==false ){
                    this.keyWord = this.default;
                  }else{
                    this.keyWord = this.resData.data;
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

 

  // 输入搜索关键词
  onInput( searchWord ){
      if( typeof searchWord=='string' ){
          if( searchWord.length>=0 ){
                  console.log( searchWord )
              this.navCtrl.push( searchResultPage,{
                  data:searchWord
              } );
          }
      }    
  }


  // 点击热搜词进入热搜结果页面
  enterSearchResult( data ){
    this.navCtrl.push( searchResultPage,{
      data:data
    } );
    console.log( data )
  }

}
