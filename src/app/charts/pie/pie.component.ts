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
  leads:any;
  approvedCount:any;
  leadsCount:number = 0;
  rejectCount:number = 0;


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
   this.getReports();
   this.getLeads();
  }
  getReports(){
    this.api.genericGet('/get-report').subscribe({
      next: (res: any) => {
        console.log(res);
        
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
  getLeads() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        this.leads = res
        console.log("Leads",this.leads)
        this.leads.forEach((ele: any) => {
          this.leadsCount = this.leadsCount + 1
          if (ele.outcome === 'completed') {
            this.approvedCount = this.approvedCount + 1
          } else {
            this.rejectCount = this.rejectCount + 1
          }
          const reportCount = {
            'All Leads':this.leadsCount,
            'approved': this.approvedCount ,
            'rejected': this.rejectCount
          };
          this.doughnutChartLabels = Object.keys(reportCount);
          this.doughnutChartDatasets[0].data = Object.values(reportCount);

        });
    }

})
}

}
  
