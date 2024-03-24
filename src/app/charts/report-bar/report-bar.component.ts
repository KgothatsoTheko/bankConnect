import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report-bar',
  templateUrl: './report-bar.component.html',
  styleUrls: ['./report-bar.component.scss']
})
export class ReportBarComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['status bars'],
    datasets: [
      { data: [], label: 'walk-in', backgroundColor: 'orange' },
      { data: [], label: 'call', backgroundColor: 'black' },
      { data: [], label: 'email', backgroundColor: 'teal' },
    ]
  };

  constructor(private api: ApiService) {
    this.fetchData()
    this.ngOnInit()
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        const sourceCount: { [key: string]: number } = {
          'walk-in': 0,
          'call': 0,
          'email': 0,
        };

        res.forEach((task: any) => {
          const source = task.Source;
          if (sourceCount.hasOwnProperty(source)) {
            sourceCount[source]++;
          }
        });
        this.barChartData.datasets[0].data.push(sourceCount['walk-in']);
        this.barChartData.datasets[1].data.push(sourceCount['call']);
        this.barChartData.datasets[2].data.push(sourceCount['email']);
      }
    });
  }
}
