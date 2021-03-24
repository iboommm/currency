import { Injectable } from '@angular/core';
import axios from 'axios';
import { CurrencyModel } from './models/CurrencyModel';

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
}
