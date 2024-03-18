import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tasks-doughnut',
  templateUrl: './tasks-doughnut.component.html',
  styleUrls: ['./tasks-doughnut.component.scss']
})
export class TasksDoughnutComponent {
  title = 'ng2-charts-demo';
  
  public doughnutChartLabels: string[] = [ 'completed', 'pending' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 0, 0 ], label: 'Task status', backgroundColor:['orange','black'] },
   
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(private api: ApiService) {
    this.api.genericGet('/get-task').subscribe({
      next: (res: any) => {
        console.log(res);
        const tasks = res; 

        const statusCount: { [key: string]: number } = {
          'completed': 0,
          'pending': 0
        };

        tasks.forEach((task: any) => {
          const status = task.status.toLowerCase();
          if (statusCount.hasOwnProperty(status)) {
            statusCount[status]++;
          }
        });

        this.doughnutChartLabels = Object.keys(statusCount);
        this.doughnutChartDatasets[0].data = Object.values(statusCount);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
  
  }

