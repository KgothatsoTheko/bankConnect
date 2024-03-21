import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-customer-bar',
  templateUrl: './customer-bar.component.html',
  styleUrls: ['./customer-bar.component.scss']
})
export class CustomerBarComponent {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '0', '1', '2'],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ],
         label: 'Customers', backgroundColor: '#ff9f68' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
}

