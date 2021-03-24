import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ChartistModule } from 'ng-chartist';
import { ChartComponent } from '../chart/chart.component';
import { BoxCurrencyModule } from '../box-currency/box-currency.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoxCurrencyModule,
    Tab2PageRoutingModule,
    ChartistModule,
  ],
  declarations: [Tab2Page, ChartComponent],
})
export class Tab2PageModule {}
