import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements AfterViewInit {
  // reports: any;
  leads: any;
  airtime: any;
  electricity:any;
  customers: any;
  feedback: any;
//Count Stats
  leadsCount: any = 0;
  rejectCount: any = 0;
  approvedCount: any = 0;
  transactionsCount: any = 0;
  electricityCount: any = 0;
  AvenueCount: any = 0
  DepositsCount: any = 0
  FeedbackCount: any = 0
  AirtimeSalesCount: any = 0
  WithdrawalsCount: any = 0

  constructor(private api: ApiService, private snackBar: MatSnackBar, private cd: ChangeDetectorRef) {
    this.getTransactions();
    this.getAvenue();
    this.getDeposits();
    this.getFeedback();
    this.getAirtimeSales();
    this.getWithdrawals();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.leadsCount
    this.rejectCount
    this.approvedCount
    this.transactionsCount
    this.electricityCount
    this.AvenueCount   
    this.DepositsCount    
     this.FeedbackCount    
    this.AirtimeSalesCount    
    this.WithdrawalsCount  
  }

  getTransactions() {
    this.api.genericGet('/get-report')
      .subscribe({
        next: (res: any) => {
        },
        error: (err: any) => this.snackBar.open(err, 'Ok', { duration: 3000 }),
        complete: () => { }
      })
  }
  getDeposits() {
    this.api.genericGet('/get-customer').subscribe({
      next: (res: any) => {
      }
    })
  }
  getAvenue() {
    this.api.genericGet('/get-task').subscribe({
      next: (res: any) => {

      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });

  }
  getFeedback() {
    this.api.genericGet('/get-feedback').subscribe({
      next: (res: any) => {
        console.log(res);
        this.feedback = res
        this.feedback.forEach(()=>{
          this.FeedbackCount = this.FeedbackCount + 1
        })
        this.updateFeedback()
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
  }
  getAirtimeSales() {
    this.api.genericGet('/get-airtime').subscribe({
      next: (res: any) => {
        console.log(res);
        this.airtime = res
        this.airtime.forEach(() => {
          this.AirtimeSalesCount = this.AirtimeSalesCount + 1
        });
        this.updateAirtime()
        this.updateSales()
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
  }
 getElectcitySales(){
  this.api.genericGet('/get-electricity').subscribe({
    next: (res: any) => {
      this.electricity = res
      this.electricity.forEach(() => {
        this.electricityCount = this.electricityCount + 1
      });
      this.updateElectricity()
      this.updateSales()
    },
    error: (err: any) => console.log("error", err),
    complete: () => { }
  });
 }

  getWithdrawals() {
    this.api.genericGet('/get-feedback').subscribe({
      next: (res: any) => {

      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
  }

  //Update Counts
  updateAirtime(){
    this.record[2].number = this.AirtimeSalesCount
  }
  updateElectricity(){
    this.record[3].number = this.electricityCount 
  }
  updateSales(){
    this.record[0].number = this.AirtimeSalesCount + this.electricityCount + this.FeedbackCount
  }
  updateFeedback(){
    this.record[1].number = this.FeedbackCount
 
  }
  record: any = [
    { Name: 'Transaction', img: '../../assets/images/customers.png', number: this.transactionsCount },
    { Name: 'Feedbacks', img: '../../assets/images/leads.png', number: this.FeedbackCount },
    { Name: 'Airtime Sales', img: '../../assets/images/tasks.png', number:this.AirtimeSalesCount },
    { Name: 'Electricity Sales', img: '../../assets/images/tasks.png', number:this.electricityCount }
  ];
  panelOpenState = false;

}
