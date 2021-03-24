import { Injectable } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class HistoricalService {
  constructor() {}

  getHistorical(
    base: string,
    startDate: string,
    endDate: string,
    symbols: string
  ): Promise<object> {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${symbols}`
        )
        .then((x) => {
          let tmp = [];
          for (const [key, value] of Object.entries(x.data['rates'])) {
            tmp.push({ label: key, series: value[symbols] });
          }
          resolve(tmp);
        })
        .catch((e) => reject(e));
    });
  }

  async setHistorical(item, startDate = null, endDate = null) {
    if (!startDate && !endDate) {
      startDate = moment().subtract(1, 'months').format('yyyy-MM-DD');
      endDate = moment().format('yyyy-MM-DD');
    }

    const selected = JSON.parse(localStorage.getItem('selected'));

    let result = await this.getHistorical(
      selected.key,
      startDate,
      endDate,
      item.key
    );

    result = _.sortBy(result, ['label']).reverse();

    const labels = _.map(result, (x) => {
      return '';
    });
    const series = _.map(result, (x) => {
      return x.series;
    });

    return { labels, series };
  }
}
