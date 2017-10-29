import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


// 引入cityPicker
import { CityPickerModule } from  "ionic2-city-picker";


// tabs页面
import { orderPage } from '../pages/order/order'; //订单
import { savePage } from '../pages/save/save';  //收藏
import { HomePage } from '../pages/home/home';  // 主页
import { userPage } from '../pages/user/user'; //个人信息

import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// 服务
import { PublicfunProvider } from '../providers/publicfun/publicfun';
import { HttpfunProvider } from '../providers/httpfun/httpfun';
import { GlobaldataProvider } from '../providers/globaldata/globaldata';
import { HttpModule } from '@angular/http';

// 公共页面
import { errorPage } from '../pages/publicPages/error/error'; //错误
import { loginPage } from '../pages/publicPages/login/login'; //登录

// 主页的子页面
import { hotSearchPage } from '../pages/home/children/hotSearch/hotSearch';  //热搜
import { searchResultPage } from '../pages/home/children/searchResult/searchResult';  //热搜的结果页面
import { noticePage } from '../pages/home/children/notice/notice';  //通知消息
import { mesCenterPage } from '../pages/home/children/mesCenter/mesCenter';  //消息中心
import { discountPage } from '../pages/home/children/discount/discount';  //优惠活动
import { shopHomePage } from '../pages/home/children/shopHome/shopHome';  //店铺首页
import { orderDetailPage } from '../pages/home/children/orderDetail/orderDetail';  //订单详情
import { servePage } from '../pages/home/children/orderDetail/serve/serve';  //订单详情的服务页面
import { backFoodsPage } from '../pages/home/children/orderDetail/backFoods/backFoods';  //订单详情的退菜
import { MPage } from '../pages/home/children/orderDetail/backFoods/modal';  //订单详情的退菜



import { orderPayPage } from '../pages/home/children/orderPay/orderPay';  //订单支付
import { foodCarPage } from '../pages/home/children/foodCar/foodCar';  // 美食车
import { securityPage } from '../pages/home/children/security/security';  // 食品安全页面
import { locationPage } from '../pages/home/children/location/location';  // 定位页面

// modal页面
import { modalPage } from '../pages/home/children/searchResult/modal-page';  //热搜的结果页面

import { ModalPage } from '../pages/home/children/orderDetail/modal';  //修改人数
import { modalpage } from '../pages/home/children/shopHome/modal';  //店铺首页
import { modalPerpage } from '../pages/home/children/shopHome/modalPer';  //  选择人数



@NgModule({
  declarations: [
    MyApp,
    orderPage,
    HomePage,
    TabsPage,
    errorPage,
    savePage,
    loginPage,
    userPage,
    hotSearchPage,
    searchResultPage,
    modalPage,
    noticePage,
    mesCenterPage,
    discountPage,
    shopHomePage,
    orderDetailPage,
    ModalPage,
    orderPayPage,
    foodCarPage,
    securityPage,
    locationPage,
    modalpage,
    modalPerpage,
    servePage,
    backFoodsPage,
    MPage,



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', //返回按钮文字
      iconModel:'ios',  //使用IOS的按钮
      mode:'ios',  //强制使用IOS的样式
      // backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标,
      tabsHideOnSubPages: 'true',   // 隐藏全部tabs
      // swipeBackEnabled:'false',//是否支持滑动后退
      
    }),
    HttpModule,
    CityPickerModule,
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    orderPage,
    HomePage,
    TabsPage,
    errorPage,
    savePage,
    loginPage,
    userPage,
    hotSearchPage,
    searchResultPage,
    modalPage,
    noticePage,
    mesCenterPage,
    discountPage,
    shopHomePage,
    orderDetailPage,
    ModalPage,
    orderPayPage,
    foodCarPage,
    securityPage,
    locationPage,
    modalpage,
    modalPerpage,
    servePage,
    backFoodsPage,
    MPage
    

  ],
  providers: [
    StatusBar,
    SplashScreen,
    PublicfunProvider,
    HttpfunProvider,
    GlobaldataProvider,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
