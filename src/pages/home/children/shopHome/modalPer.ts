import { Component } from '@angular/core';
import { NavParams,NavController,ViewController } from 'ionic-angular';

import { orderDetailPage } from '../orderDetail/orderDetail'

@Component({
  selector: 'page-modalPer',
  templateUrl: 'modalPer.html'
})
export class modalPerpage {
array = [];
navid = 0;
choiseId = 1;
aa:any;
choose;
resData;
  

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController
              ) {
                
                // 接收的数据
                // console.log('modal接收到的数据', navParams.get('data'));
                this.resData = navParams.get('data')
                console.log( this.resData )
        
                for( var a=1; a<=100; a++ ){
                    this.aa=a;
                    this.array.push(this.aa)
                }

  }



  // 点击选择的一个
  clicks( i,num ){
    this.navid = i;
    this.choiseId = this.navid+1;

    this.choose = num;
  }

  sure( choose ){
    console.log( this.choose )

    //  let data = { 'foo': this.choose };
    this.navCtrl.push( orderDetailPage,{
      data:this.choose,
      list:this.resData
    } );
    this.viewCtrl.dismiss(  );
    
  }

  cancel(){
    this.viewCtrl.dismiss(); //取消modal
    
  }

  

}
