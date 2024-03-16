import { Component } from '@angular/core';
import { ChartConfiguration, Colors } from 'chart.js';

@Component({
  selector: 'app-tasks-bar',
  templateUrl: './tasks-bar.component.html',
  styleUrls: ['./tasks-bar.component.scss']
})
export class TasksBarComponent {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ],
         label: 'completed', backgroundColor: 'orange' },
         

      { data: [ 28, 48, 40, 19, 86, 27, 90 ], 
        label: 'pending',backgroundColor: 'black' },

    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }

}
