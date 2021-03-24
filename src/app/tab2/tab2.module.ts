import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { BoxCurrencyComponent } from '../box-currency/box-currency.component';
import { ChartistModule } from 'ng-chartist';
import { ChartComponent } from '../chart/chart.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ChartistModule,
  ],
  declarations: [Tab2Page, BoxCurrencyComponent, ChartComponent],
})
export class Tab2PageModule {}
