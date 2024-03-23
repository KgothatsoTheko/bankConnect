import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-bar',
  templateUrl: './customer-bar.component.html',
  styleUrls: ['./customer-bar.component.scss']
})
export class CustomerBarComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Female','Male'],
    datasets: 
    [
      { data: [], label: 'female', backgroundColor: 'orange' },
      { data: [], label: 'male', backgroundColor: 'black' }
    ]
    // [
    //   { data: [ 65, 59, 80, 81, 56, 55, 40 ],
    //      label: 'Customers', backgroundColor: '#ff9f68' },
    // ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private api: ApiService) {
    
  }

  ngOnInit() {
    this.fetchData();
  }
  

  fetchData() {
    this.api.genericGet('/get-customer').subscribe({
      next: (res: any) => {
        const customers = res; 

        const genderCount: { [key: string]: number } = {
          'Female': 0,
          'Male': 0
        };

        customers.forEach((customer: any) => {
          const gender = customer.gender.toLowerCase();
          if (genderCount.hasOwnProperty(gender)) {
            genderCount[gender]++;
          }
        });

        this.barChartData.datasets[0].data.push(genderCount['Female']);
        this.barChartData.datasets[1].data.push(genderCount['Male']);
      }
    });
  }
    
}

