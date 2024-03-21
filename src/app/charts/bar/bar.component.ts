import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Customers to Leads'],
    datasets: [
      { data: [], label: 'Customers', backgroundColor: 'orange' },
      { data: [], label: 'Leads', backgroundColor: 'black' }
    ]
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        const tasks = res; 

        const statusCount: { [key: string]: number } = {
          'Customers': 0,
          'Leads': 0
        };

        tasks.forEach((task: any) => {
          const status = task.status.toLowerCase();
          if (statusCount.hasOwnProperty(status)) {
            statusCount[status]++;
          }
        });

        this.barChartData.datasets[0].data.push(statusCount['Customers']);
        this.barChartData.datasets[1].data.push(statusCount['Leads']);
      }
    });
  }
}
