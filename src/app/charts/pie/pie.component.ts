import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
  title = 'ng2-charts-demo';

  public doughnutChartLabels: string[] = ['Rejected', 'pending', 'Approved'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [0, 0], label: 'Outcome Report', backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)']
    },

  ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(private api: ApiService) {
   this.getReports()
  }
  getReports(){
    this.api.genericGet('/get-report').subscribe({
      next: (res: any) => {
        // console.log(res);
        const reports = res;
        const reportCount: { [key: string]: number } = {
          'pending': 15,
          'approved': 8,
          'rejected': 7
        };
        // console.log(reportCount)
      reports.forEach((report: any) => {
          const outcome = report.outcome.toLowerCase();
          if (reportCount.hasOwnProperty(outcome)) {
            reportCount[report]++;
            // console.log("Ekse Shimza",reportCount)
          } 
        });
        this.doughnutChartLabels = Object.keys(reportCount);
        this.doughnutChartDatasets[0].data = Object.values(reportCount);
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
}
