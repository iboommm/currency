import { Component } from '@angular/core';
import { CurrenciesService } from '../currencies.service';
import { CurrencyModel } from '../models/CurrencyModel';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  list: CurrencyModel[] = [];

  constructor(public currenciesService: CurrenciesService) {
    this.main();
  }

  async main() {
    const list = localStorage.getItem('list');
    if (!list) {
      this.list = await this.currenciesService.getAllCurrencies();
      this.currenciesService.setListToLocalStorage(this.list);
    } else {
      this.list = JSON.parse(localStorage.getItem('list'));
    }
  }
}
