import { Component } from '@angular/core';
import { CurrenciesService } from '../currencies.service';
import { CurrencyModel } from '../models/CurrencyModel';
import { ModalController, LoadingController } from '@ionic/angular';
import { ChartComponent } from '../chart/chart.component';
import { HistoricalService } from '../historical.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  selected: CurrencyModel;
  list: CurrencyModel[] = [];

  loading;

  constructor(
    public currenciesService: CurrenciesService,
    public historicalService: HistoricalService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) {
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

    const selected = localStorage.getItem('selected');
    if (!selected) {
      this.selected = this.list[0];
      this.selected.editable = true;
      this.currenciesService.setSelectedToLocalStorage(this.selected);
    } else {
      this.selected = JSON.parse(localStorage.getItem('selected'));
    }
  }

  async presentModal(item) {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loading.present();

    const startDate = moment().subtract(1, 'months').format('yyyy-MM-DD');
    const endDate = moment().format('yyyy-MM-DD');

    let result = await this.getHistorical(
      this.selected.key,
      startDate,
      endDate,
      item.key
    );

    result = _.sortBy(result, ['label']).reverse();

    const labels = _.map(result, (x) => {
      return x.label;
    });
    const series = _.map(result, (x) => {
      return x.series;
    });
    const modal = await this.modalController.create({
      component: ChartComponent,
      swipeToClose: true,
      componentProps: { item, labels, series },
    });
    await this.loading.dismiss();
    return await modal.present();
  }

  async getHistorical(
    base: string,
    startDate: string,
    endDate: string,
    target: string
  ) {
    return new Promise((resolve, reject) => {
      this.historicalService
        .getHistorical(base, startDate, endDate, target)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
