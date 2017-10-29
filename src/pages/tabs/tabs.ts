import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { orderPage } from '../order/order';
import { savePage } from '../save/save';
import { userPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = orderPage;
  tab3Root = savePage;
  tab4Root = userPage;

  constructor() {

  }
}
