import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor() {}

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
}
