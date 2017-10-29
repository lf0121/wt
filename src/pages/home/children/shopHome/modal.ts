import { Component } from '@angular/core';
import { NavParams,NavController,ViewController } from 'ionic-angular';

// 服务
// import 	{ PublicfunProvider } from '../../../../providers/publicfun/publicfun'
// import 	{ HttpfunProvider } from '../../../../providers/httpfun/httpfun';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class modalpage {
  img;
  

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController
              ) {
                
                // 接收的数据
                // console.log('modal接收到的数据', navParams.get('data'));
        
                this.img = navParams.get('data');
                console.log( this.img )

  }

  click( datas ){
    console.log( 'modal传送出去的数据...'+ datas )

    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss( datas );
  }

  

}
