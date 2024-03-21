import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent {
  displayedColumns: string[] = ['transactionId', 'customerName', 'transactionType', 'amount', 'date', 'status'];
  dataSource!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) {
    this.getCustomerTransaction();
  }

  getCustomerTransaction() {
    this.api.genericGet("/get-lead").subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(res)
      },
      error: (error: any) => {
        console.log('Error', error)
      }
    })
  }

  exportToExcel(): void {
    let element = document.getElementById('transaction')
 
     // Create a worksheet
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
     // Create a workbook
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
     // Save the workbook as an Excel file
     XLSX.writeFile(wb, "Transaction.xlsx");
   }

}
