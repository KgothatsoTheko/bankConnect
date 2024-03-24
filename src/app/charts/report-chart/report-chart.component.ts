import { Component, ViewEncapsulation } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent {
  title = 'ng2-charts-demo';
  
  public doughnutChartLabels: string[] = ['Female', 'Male'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [0, 0], label: 'Gender Distribution', backgroundColor: ['orange', 'black'] },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false 
  };

  constructor(private api: ApiService) {
    this.fetchLeadData();
  }

  private fetchLeadData(): void {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        const genderCount: { [key: string]: number } = {
          'male': 0,
          'female': 0
        };

        res.forEach((lead: any) => {
          const gender = lead.gender?.toLowerCase();
          if (genderCount.hasOwnProperty(gender)) {
            genderCount[gender]++;
          }
        });

        this.updateChart(genderCount);
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  private updateChart(genderCount: { [key: string]: number }): void {
    this.doughnutChartLabels = Object.keys(genderCount);
    this.doughnutChartDatasets[0].data = Object.values(genderCount);
  }
}
