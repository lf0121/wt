import { Injectable } from '@angular/core';
// import { Http,Headers,RequestOptions,Response  } from '@angular/http';
import { Http,Headers,RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { GlobaldataProvider } from "../globaldata/globaldata";
import 	{PublicfunProvider} from '../publicfun/publicfun'


/*
  Generated class for the HttpfunProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpfunProvider {
	
	urlxm="http://wtapi.itzlu.com/newzb/";
	userinfors;
	globalshujialist;
	constructor(
		public http:Http,
		public publicfun:PublicfunProvider,
		public globdata:GlobaldataProvider
		
	
	){
		
		
  }
  // 获取地区
  public getCitiesData(){
    return this.http.get('./assets/cityPicker/cityData.json')
      .toPromise()
      .then(response => response.json())
      .catch( err => {
        return Promise.reject(err)
      })
 
  }

	public get(url) {
    return new Promise((resolve, reject) => {
      // get 请求这里加了showLoading 
      // showLoading 显示加载符号,他用的是个modal窗口,所以会让之前屏幕的输入框失去了焦点
    	this.publicfun.showLoading();
      this.http.get(this.urlxm+url)
        .map(res => res.json())
        .subscribe(data => {
        	this.publicfun.hideLoading();
          resolve(data);
        }, err => {
          reject(err);
        })
    })
  }
  // 这里添加的服务 里面没有使用showLoading 所以不会失去焦点six
 
	 public get2(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlxm+url)
        .map(res => res.json())
        .subscribe(data => {
  
          resolve(data);
        }, err => {
          reject(err);
        })
    })
  }
	 
	  public  post(url,body) {
    let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let datas=this.toQueryString(body);
    
    return new Promise((resolve, reject) => {
    	this.publicfun.showLoading();
      this.http.post(this.urlxm+url, datas, options )
        .map(res => res.json())
        .subscribe(
        	data => {
        		resolve(data);
        		this.publicfun.hideLoading();
        		}
        	, err => 
        	reject(err))
    })
  }
	  
	 
	  
	  //将json进行参数化
   private toQueryString(obj) {
     let result = [];
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         result = result.concat(queryValues);
       } else {
         result.push(this.toQueryPair(key, values));
       }
    }
     return result.join('&');
   }

   private toQueryPair(key, value) {
     if (typeof value == 'undefined') {
       return key;
     }
     return key + '=' + encodeURIComponent(value === null ? '' : String(value));
   }
   
   	  //加入购物车
	  public add(bookid,userinfor){
		if(userinfor) {
		this.get('').then(datas => {
			console.log(datas);
			this.publicfun.showAlert("", "添加成功!");
			});
		}else{
			this.publicfun.showAlert("未登录!", "您还没有登录哦!");
		}
	}
	  


 
}
	  
	  


