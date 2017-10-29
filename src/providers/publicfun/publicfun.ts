import {Injectable} from '@angular/core';
// import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';
import { LoadingController, Loading, AlertController} from 'ionic-angular';
// import {StatusBar} from '@ionic-native/status-bar';
// import {SplashScreen} from '@ionic-native/splash-screen';
// import {Network} from '@ionic-native/network';

// declare var LocationPlugin;
// declare var AMapNavigation;
// declare var cordova: any;

/*
  Generated class for the PublicfunProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PublicfunProvider {
 private loading: Loading;
 private loadingIsOpen: boolean = false;

  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController) { }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {//最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 50000);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };
  
//获取是否登录
	
	public getuserinfor(){
		let userinfor;
		userinfor=localStorage.getItem('userinfor');
		
		return userinfor;
	}
	
	 //将秒数转换成时间
	  public stotime(fmt){
		let unixTimestamp = new Date( fmt*1000 ) ;
	 	let commonTime = unixTimestamp.toLocaleString();
	 	// console.log(commonTime);
		return commonTime;
	  }
	  
	  //alertCtrl
	  public showAlert(title,subTitle) { 
        let alert = this.alertCtrl.create({ 
            title: title, 
            subTitle:subTitle, 
            buttons: ['OK'] 
        }); 
        alert.present(); 
    }
	  

	  

}
