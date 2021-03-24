import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { CurrencyModel } from './models/CurrencyModel';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(public http: HttpClient) {}

  getRates(base: string): Promise<object> {
    return new Promise((resolve, reject) => {
      axios
        .get('https://api.exchangeratesapi.io/latest?base=' + base)
        .then((x) => {
          resolve(x.data);
        })
        .catch((e) => reject(e));
    });
  }

  async getAllCurrencies(): Promise<CurrencyModel[]> {
    return new Promise(async (resolve, reject) => {
      this.http.get('assets/data/currencies.json').subscribe((response) => {
        const tmp: CurrencyModel[] = response['data'].map(
          (x): CurrencyModel => {
            x.value = '1000';
            x.editable = false;
            x.favorite = false;
            x.image = `../../assets/icon/national/${x.key
              .slice(0, -1)
              .toLocaleLowerCase()}.png`;
            return x;
          }
        );
        resolve(tmp);
      });
    });
  }
}
