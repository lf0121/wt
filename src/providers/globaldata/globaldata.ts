import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the GlobaldataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobaldataProvider {
	public static getuserinfors(){
			let userinfor;
			let obj=localStorage.getItem('userinfor');
			if(obj){
				userinfor=JSON.parse(obj);
			}
			return userinfor;
	}
	
	

}
