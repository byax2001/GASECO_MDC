import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import * as echarts from 'echarts';

@Component({
  selector: 'velocimetro',
  standalone: true,
  imports: [],
  templateUrl: './velocimetro.html',
  styleUrl: './velocimetro.css'
})
export class VelocimetroComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('chart', { static: false })
  chartElement!: ElementRef<HTMLDivElement>;

  nameVelocimetro = input.required<string>();
  nameVariable1 = input.required<string>();
  nameVariable2 = input.required<string>();
  variable1 = input.required<number>();
  variable2 = input.required<number>();
  symbolvariable1 = input.required<string>();
  symbolvariable2 = input.required<string>();

  private chart?: echarts.ECharts;

  ngAfterViewInit(): void {
    this.chart = echarts.init(this.chartElement.nativeElement);

    this.actualizarGrafica();

    window.addEventListener('resize', this.resizeChart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.actualizarGrafica();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeChart);

    this.chart?.dispose();
  }

  private resizeChart = (): void => {
    this.chart?.resize();
  };

  private actualizarGrafica(): void {

    const porcentaje =
      this.variable2() > 0
        ? (this.variable1() / this.variable2()) * 100
        : 0;

    const porcentajeMostrar = Math.round(porcentaje * 100) / 100;

    const option: echarts.EChartsOption = {

      tooltip: {
        formatter: () => {
          return `
            <strong>Cumplimiento</strong><br/>
            ${this.nameVariable1()}: ${this.variable1().toLocaleString()}<br/>
            ${this.nameVariable2()}: ${this.variable2().toLocaleString()}<br/>
            Cumplimiento: ${porcentajeMostrar}%
          `;
        }
      },

      series: [
        {
          type: 'gauge',

          min: 0,
          max: 150,

          startAngle: 210,
          endAngle: -30,

          splitNumber: 6,

          progress: {
            show: true,
            width: 18
          },

          axisLine: {
            lineStyle: {
              width: 18
            }
          },

          axisTick: {
            distance: -25,
            length: 8
          },

          splitLine: {
            distance: -30,
            length: 14
          },

          axisLabel: {
            distance: 25,
            formatter: '{value}%'
          },

          pointer: {
            show: true,
            length: '65%',
            width: 6
          },

          anchor: {
            show: true,
            size: 14
          },

          title: {
            show: true,
            offsetCenter: [0, '65%'],
            fontSize: 16
          },

          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            offsetCenter: [0, '40%'],
            fontSize: 28,
            fontWeight: 'bold'
          },

          data: [
            {
              value: porcentajeMostrar,
              name: this.nameVelocimetro()
            }
          ]
        }
      ]
    };

    this.chart?.setOption(option);
  }
}