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
  dataSource:any;
  currentDate:Date = new Date();
  fileName= 'ReportSheet.xlsx';
  report:any;
  displayedColumns: string[] = ['Customer', 'Contact', 'Interactions Type', 'Date & Time', 'Employee', 'Outcome'];
  isLeftDisabled: boolean = true;
  isRightDisabled: boolean = false;
  
  @Input() data!:any[]; 
  @Input() cardType!: string;

  @ViewChild('content') content!: ElementRef;

  constructor(private api: ApiService, private snackBar: MatSnackBar,private cd: ChangeDetectorRef) { 
    this.api.genericGet('/get-report')
      .subscribe({
        next: (res: any) => {
          this.report = res
          console.log(res)
          this.dataSource = this.report;
        },
        error: (err: any) => this.snackBar.open(err.error, 'Ok', { duration: 3000 }),
        complete: () => { }
      }) 
  }

  ngAfterViewInit() {
    this.isRightDisabled = (this.content.nativeElement.scrollWidth < window.innerWidth);
    // Trigger Change Detect manually
    this.cd.detectChanges();
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('report-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

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
  
  
  panelOpenState = false;

}
