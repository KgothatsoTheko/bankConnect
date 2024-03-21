import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-content-cards',
  templateUrl: './content-cards.component.html',
  styleUrls: ['./content-cards.component.scss']
})
export class ContentCardsComponent {
  leadsCount: number = 0;
  tasksCount: number = 0;
  customerCount: number =0;
  reportsCount: number = 0;

  constructor(private api: ApiService) {
    this.getLeads();
    this.getTasks();
    this.getCustomer();
    this.getReports();
  }

  getLeads() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        this.leadsCount = res.length;
        this.updateCards();
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  updateCards() {
    this.cards[1].number = this.leadsCount;
  }

  updateCustomer(){
    this.cards[0].number = this.customerCount
  }

  updateTasks() {
    this.cards[2].number = this.tasksCount;
  }

  getCustomer(){

    this.api.genericGet('/get-customer').subscribe({
      next: (res: any) => {
        this.customerCount = res.length;
        this.updateCustomer();
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }


  updateReports() {
    this.cards[3].number = this.reportsCount;
  }

  getReports(){
    this.api.genericGet('/get-report').subscribe({
      next: (res: any) => {
        this.customerCount = res.length;
        this.updateReports();
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }



  getTasks(){
    this.api.genericGet('/get-task').subscribe({
      next: (res: any) => {
        this.tasksCount = res.length;
        this.updateTasks(); 
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  cards: any = [
    { label: 'Customers', img: '../../assets/images/customers.png', number: "" },
    { label: 'Leads', img: '../../assets/images/Leads.png', number: this.leadsCount }, 
    { label: 'Tasks', img: '../../assets/images/tasks.png', number: this.tasksCount },
    { label: 'Reports', img: '../../assets/images/reports.png', number: "" }
  ];
}
