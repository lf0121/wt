import { Component } from '@angular/core';
import { NavParams,NavController,ViewController } from 'ionic-angular';



@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  number = [];
  navid = 0;
  choiseId = 1;
  
aa;
choose;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController
              ) {
                
                // 接收的数据
                console.log('modal接收到的数据', navParams.get('data'));
        
                for( var a=1; a<=100; a++ ){
                      this.aa=a;
                      this.number.push(this.aa)
                  }

  }

  chooseNum(i,item){
    this.navid = i;
    this.choiseId = this.navid+1;

    this.choose = item;
    

    
 }

 sure( choose ){
   
    // let data = { 'foo': this.choose };

  this.viewCtrl.dismiss( choose ); //取消modal
 }

//  取消
 cancel(){
  this.viewCtrl.dismiss(); //取消modal
  
 }

  

}
