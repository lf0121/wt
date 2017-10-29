import { Component } from '@angular/core';
import { NavParams,NavController,ViewController } from 'ionic-angular';

// 服务
// import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
// import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';


@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html'
})
export class modalPage {

  // 申明变量
  foodName = [
    {
      name:'全部',
      id:0
    }
  ];
  resDatas; //接收到的数据

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController
              ) {
                
                // 接收的数据
                console.log('modal接收到的数据', navParams.get('data'));
                this.resDatas = navParams.get('data')
                // console.log( this.resDatas )
                // this.foodName = this.resDatas;
                for( let m=0;m<this.resDatas.length;m++ ){
                    this.foodName.push( this.resDatas[m] )
                };
                console.log( this.foodName )
        

  }

  click( i,item ){
    // console.log( item )
    let data = {
        name:item.name,
        id:item.id
    };
    // console.log( data )
    this.viewCtrl.dismiss( data );
  }

  

}
