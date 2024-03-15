import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-demograph-line',
  templateUrl: './demograph-line.component.html',
  styleUrls: ['./demograph-line.component.scss']
})
export class DemographLineComponent {
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40, 56, 78, 34, 45 ],
        label: 'Males',
        fill: true,
        tension: 0.5,
        borderColor: 'orange',
        backgroundColor: 'rgba(236, 234, 234, 0)'
      },
      {
        data: [ 89, 34, 56, 88, 68, 56, 42, 43, 23, 68, 34 ],
        label: 'Females',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(236, 234, 234, 0)'
      }

    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }

  ngOnInit() {
  }
}
