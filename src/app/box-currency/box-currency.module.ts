import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxCurrencyComponent } from './box-currency.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [BoxCurrencyComponent],
  exports: [BoxCurrencyComponent],
})
export class BoxCurrencyModule {}
