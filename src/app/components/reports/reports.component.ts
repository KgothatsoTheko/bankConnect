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
  dataEmployee:any;
  currentDate: Date = new Date();
  fileName = 'ReportSheet.xlsx';

  // reports: any;
  leads: any;
  tasks: any;
  customers:any;

  //Report Fields
  customer:any;
  contact :any ;
  type : any;
  date :any ;
  employee:any;
  outcome:any;
  reports:any[]=[]

  displayedColumns: string[] = ['Customer', 'Contact', 'Interactions Type', 'Date & Time', 'Employee', 'Outcome'];
  isLeftDisabled: boolean = true;
  isRightDisabled: boolean = false;


  @ViewChild('content') content!: ElementRef;
  leadsCount: any = 0;
  rejectCount: any = 0;
  approvedCount: any = 0;

  constructor(private api: ApiService, private snackBar: MatSnackBar, private cd: ChangeDetectorRef) {
    this.getLeads();
    this.getReports();
    this.getTasks();
    this.getCustomers();
  }

  ngAfterViewInit() {
    this.isRightDisabled = (this.content.nativeElement.scrollWidth < window.innerWidth);
    // Trigger Change Detect manually
    this.cd.detectChanges();
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('report-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  handleOnSlide(type: string) {
    let scrollValue;
    console.log(this.content)
    if (this.content.nativeElement.scrollWidth > window.innerWidth) {
      // Removing 110px which is the white space on the left and right of the content and the scrollbar
      if (type === 'left') {
        scrollValue = this.content.nativeElement.scrollLeft - (window.innerWidth - 110);
      } else {
        scrollValue = this.content.nativeElement.scrollLeft + (window.innerWidth - 110);
      }

      // Added this to add an animation while scrolling...
      this.content.nativeElement.scrollTo({
        left: scrollValue,
        behavior: 'smooth'
      });

      let totalUsedWidth = scrollValue + window.innerWidth;

      this.isRightDisabled = (totalUsedWidth >= this.content.nativeElement.scrollWidth);
      this.isLeftDisabled = (scrollValue < 1);
    } else {
      this.isLeftDisabled = true;
      this.isRightDisabled = true;
    }
  }
  getLeads() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        this.leads = res
        this.reports.push(res)
        console.log("reports 3", this.reports)
        console.log("Leads",this.leads)
        this.leads.forEach((ele: any) => {
          this.leadsCount = this.leadsCount + 1
          if (ele.outcome === 'completed') {
            this.approvedCount = this.approvedCount + 1
          } else {
            this.rejectCount = this.rejectCount + 1
          }

        });
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }
  getReports() {
    this.api.genericGet('/get-report')
      .subscribe({
        next: (res: any) => {
          this.reports = res
          console.log("Reports",res)
        },
        error: (err: any) => this.snackBar.open(err, 'Ok', { duration: 3000 }),
        complete: () => { }
      })
  }
  getCustomers(){
    this.api.genericGet('/get-customer').subscribe({
      next:(res:any) => {
        this.customers = res
        this.reports.push(res)
        console.log("reports 1", this.reports)
        this.dataCustomers =  this.customers 
        console.log("Customers",this.dataCustomers)
       
      }
    })
  }
  getTasks() {
    this.api.genericGet('/get-task').subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.dataEmployee = this.tasks;
        console.log("Tasks",this.tasks)
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });

  }
  panelOpenState = false;

}
