import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { CurrenciesService } from '../currencies.service';

import { CurrencyModel } from '../models/CurrencyModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  selected: CurrencyModel;

  searchToggle: boolean = false;
  searchTxt: string = '';

  list: CurrencyModel[] = [];

  rate: Object;

  constructor(
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public currenciesService: CurrenciesService
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
    await this.getNewRates();
  }

  async doRefresh(event) {
    await this.getNewRates(this.selected.key);
    event.target.complete();
  }

  async getNewRates(base: string = '') {
    if (!base) {
      base = this.selected?.key || 'USD';
    }
    const newRates = await this.currenciesService.getRates(base);
    this.list = this.list.map((x) => {
      x.rate = newRates['rates'][x.key];
      return x;
    });
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Base currency',
          icon: 'push-outline',
          handler: () => {
            this.list = this.list.map((x) => {
              x.editable = false;
              return x;
            });

            this.selected = item;
            this.selected.value = '1000';
            this.selected.editable = true;

            this.getNewRates(this.selected.key);
            this.currenciesService.setSelectedToLocalStorage(this.selected);
            this.currenciesService.setListToLocalStorage(this.list);
          },
        },
        {
          text: item.favorite ? 'Unfavorite' : 'Favorite',
          icon: 'heart',
          handler: () => {
            item.favorite = !item.favorite;
            this.list = this.list.sort(function (a, b) {
              return Number(b.favorite) - Number(a.favorite);
            });
            this.currenciesService.setListToLocalStorage(this.list);
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

  doFilted(item) {
    if (item.name === this.selected.name) {
      return false;
    }
    if (
      this.searchTxt === '' ||
      item.name
        .toLocaleLowerCase()
        .includes(this.searchTxt.toLocaleLowerCase()) ||
      item.key.toLocaleLowerCase().includes(this.searchTxt.toLocaleLowerCase())
    ) {
      return true;
    }
  }
}
