import { LoadingController, ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { CurrencyModel } from '../models/CurrencyModel';
import { HistoricalService } from '../historical.service';

declare var require: any;
const data: any = require('../../assets/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() item: CurrencyModel;
  @Input() labels: string[] = [];
  @Input() series: number[];
  @Input() doChangeDate: Function;
  @Input() setHistorical: Function;

  chart: Chart;
  range: string = '1M';
  initChart: boolean = false;
  loading;

  constructor(
    public historicalService: HistoricalService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) {}

  ngDoCheck() {
    if (
      this.chart &&
      this.chart?.data.series['0'].length === this.series.length
    ) {
      return;
    }
    this.chart = {
      type: 'Line',
      data: {
        labels: this.labels,
        series: [this.series],
      },
      options: {
        showArea: true,
        fullWidth: true,
        lineSmooth: Chartist.Interpolation.none(),
        axisX: {
          showGrid: false,
        },
        chartPadding: { top: 10, right: 20, bottom: 0, left: 20 },
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px) and (min-width: 381px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
              },
            },
          },
        ],
        [
          'screen and (max-width: 380px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 3 === 0 ? value : null;
              },
            },
          },
        ],
      ],
    };
    setTimeout(() => {
      this.initChart = true;
    }, 500);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
