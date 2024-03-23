import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['status bars'],
    datasets: [
      { data: [], label: 'Completed', backgroundColor: 'orange' },
      { data: [], label: 'Pending', backgroundColor: 'black' }
    ]
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.genericGet('/get-task').subscribe({
      next: (res: any) => {
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

        this.barChartData.datasets[0].data.push(statusCount['completed']);
        this.barChartData.datasets[1].data.push(statusCount['pending']);
      }
    });
  }
  
}
