import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
  title = 'ng2-charts-demo';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      'New Leads',
      'Accepted,',
      'Rejected'
    ],
    datasets: [
      {
        data: [15,7,8],
        borderColor: 'orange',
        backgroundColor: ['Blue', 'Red', 'Crimson']
      }

    ]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false
  };
  public pieChartLegend = true;


  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
}
