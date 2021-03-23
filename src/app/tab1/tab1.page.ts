import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CurrencyModel } from '../models/CurrencyModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  selected: CurrencyModel = {
    name: 'USD',
    sub: 'Dollar',
    editable: true,
    value: '1000',
  };

  list: CurrencyModel[] = [
    {
      name: 'THB',
      sub: 'Thai baht',
      editable: false,
      value: '1000',
    },
  ];

  constructor(public alertController: AlertController) {
    this.main();
  }

  async main() {}

  async doRefresh(event) {
    await this.presentAlert();
    event.target.complete();
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
