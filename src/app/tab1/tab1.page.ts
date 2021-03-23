import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';

import { CurrencyModel } from '../models/CurrencyModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  selected: CurrencyModel;

  list: CurrencyModel[] = [
    {
      key: 'THB',
      name: 'Thai baht',
      editable: false,
      favorite: false,
      value: '1000',
    },
  ];

  rate = {
    rates: {
      CAD: 1.2496226732,
      HKD: 7.765721952,
      ISK: 126.7818212309,
      PHP: 48.5015931578,
      DKK: 6.2351165521,
      HUF: 307.6471574711,
      CZK: 21.8639946336,
      GBP: 0.723067248,
      RON: 4.0970987758,
      SEK: 8.5175247359,
      IDR: 14402.4987422438,
      INR: 72.3541002851,
      BRL: 5.5271675331,
      RUB: 74.5439376153,
      HRK: 6.3508301191,
      JPY: 108.8126781821,
      THB: 30.8703672648,
      CHF: 0.924283079,
      EUR: 0.8385041087,
      MYR: 4.1140365588,
      BGN: 1.6399463357,
      TRY: 7.8900721114,
      CNY: 6.5052825759,
      NOK: 8.501844709,
      NZD: 1.3933422774,
      ZAR: 14.7289116217,
      USD: 1,
      MXN: 20.6554586617,
      SGD: 1.3409357706,
      AUD: 1.2912963274,
      ILS: 3.3040415898,
      KRW: 1127.6035552574,
      PLN: 3.8585443569,
    },
    base: 'USD',
    date: '2021-03-22',
  };

  constructor(
    public alertController: AlertController,
    public http: HttpClient,
    public actionSheetController: ActionSheetController
  ) {
    this.main();
  }

  async main() {
    await this.getNewRates();
    this.list = await this.getAllCurrencies();
    if (!this.selected) {
      this.selected = this.list[0];
      this.selected.editable = true;
      this.list = this.list.filter((x) => x.name !== this.selected.name);
    }
    await this.getNewRates();
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

  async doRefresh(event) {
    await this.presentAlert();
    event.target.complete();
  }

  async getNewRates() {
    const newRates = await this.getRates('USD');
    this.list = this.list.map((x) => {
      x.rate = newRates['rates'][x.key];
      return x;
    });
  }

  getRates(base: string): Promise<object> {
    return new Promise(async (resolve, reject) => {
      resolve(this.rate);
    });
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            item.favorite = true;
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async presentAlert(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK'],
      });

      await alert.present();
      resolve();
    });
  }
}
