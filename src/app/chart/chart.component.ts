import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { CurrencyModel } from '../models/CurrencyModel';

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
  @Input() labels: string[];
  @Input() series: number[];

  lineArea2: Chart;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log({
      labels: this.labels,
      series: this.series,
    });
    this.lineArea2 = {
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
        chartPadding: { top: 0, right: 20, bottom: 0, left: 20 },
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
      events: {
        created(data: any): void {
          var defs = data.svg.elem('defs');
          defs
            .elem('linearGradient', {
              id: 'gradient1',
              x1: 0,
              y1: 1,
              x2: 0,
              y2: 0,
            })
            .elem('stop', {
              offset: 0.2,
              'stop-color': '#FFF',
            })
            .parent()
            .elem('stop', {
              offset: 1,
              'stop-color': '#2F8BE6',
            });

          defs
            .elem('linearGradient', {
              id: 'gradient2',
              x1: 0,
              y1: 1,
              x2: 0,
              y2: 0,
            })
            .elem('stop', {
              offset: 0.5,
              'stop-color': '#FFF',
            })
            .parent()
            .elem('stop', {
              offset: 1,
              'stop-color': '#F77E17',
            });
        },
        draw(data: any): void {
          var circleRadius = 6;
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: circleRadius,
              class: 'ct-point-circle',
            });
            data.element.replace(circle);
          }
        },
      },
    };
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
