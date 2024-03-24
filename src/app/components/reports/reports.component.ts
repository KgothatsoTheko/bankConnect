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
  dataCustomers: any;
  dataEmployee: any;


  currentDate: Date = new Date();
  fileName = 'ReportSheet.xlsx';

  // reports: any;
  leads: any;
  airtime: any;
  customers: any;
  feedback: any;


  displayedColumns2: string[] = ['Interactions Type', 'Date & Time', 'Employee', 'Outcome'];


  @ViewChild('content') content!: ElementRef;
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
    this.getTransactions();
    this.getAvenue();
    this.getDeposits();
    this.getFeedback();
    this.getAirtimeSales();
    this.getWithdrawals();
  }

  exportexcel(tableName: string): void {
    /* pass here the table id */
    let element = document.getElementById(tableName);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

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
        console.log(this.airtime)
        
        console.log("Airtime Count",this.AirtimeSalesCount)

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
  record: any = [
    { Name: 'Transaction', img: '../../assets/images/customers.png', number: this.transactionsCount },
    { Name: 'Total Revenue', img: '../../assets/images/leads.png', number: this.AvenueCount },
    { Name: 'Airtime Sales', img: '../../assets/images/tasks.png', number:this.AirtimeSalesCount },
    { Name: 'Electricity Sales', img: '../../assets/images/tasks.png', number:this.electricityCount },
    { Name: 'Withdrwals', img: '../../assets/images/reports.png', number: this.WithdrawalsCount },
    { Name: 'Deposits', img: '../../assets/images/reports.png', number: this.DepositsCount }
  ];
  panelOpenState = false;

}
