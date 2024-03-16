import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-tasks-doughnut',
  templateUrl: './tasks-doughnut.component.html',
  styleUrls: ['./tasks-doughnut.component.scss']
})
export class TasksDoughnutComponent {
  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = [ 'completed', 'pending' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450 ], label: 'Task status', backgroundColor:['teal','orange'] },
   
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor() {
  }
}
