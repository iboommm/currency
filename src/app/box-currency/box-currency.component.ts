import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { CurrencyModel } from '../models/CurrencyModel';

@Component({
  selector: 'app-box-currency',
  templateUrl: './box-currency.component.html',
  styleUrls: ['./box-currency.component.scss'],
})
export class BoxCurrencyComponent implements OnInit {
  @Input() item: CurrencyModel;

  @ViewChild('input', null) input: IonInput;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor() {}

  ngOnInit() {
    this.item.value = this.numberWithCommas(
      this.item.value.replace(/\D+/g, '')
    );
  }

  async doFocus(event) {
    let inputEle = await this.input.getInputElement();
    inputEle.setSelectionRange(
      this.item.value.toString().length,
      this.item.value.toString().length
    );
  }

  numberWithCommas(x) {
    var parts = x.toString().split('.');
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      (parts[1] ? '.' + parts[1] : '')
    );
  }

  async doChange(event) {
    if (event.target.value[event.target.value.length - 1] === '.') {
      this.item.value = event.target.value;
    } else {
      event.target.value = this.item.value = this.numberWithCommas(
        event.target.value.replace(/[^0-9.]/g, '')
      );
    }
  }
}
