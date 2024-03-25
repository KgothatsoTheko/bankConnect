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
  displayedColumns: string[] = ['transactionId', 'customerName', 'provider', 'amount',];
  displayedColumns2: string[] = ['transactionId', 'customerName', 'meterNo', 'amount',];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort2!: MatSort;

  constructor(private api: ApiService) {
    this.getAirtimeTransactions();
    this.getElectricityTransactions();
  }

  getAirtimeTransactions() {
    this.api.genericGet("/get-airtime").subscribe({
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

  getElectricityTransactions() {
    this.api.genericGet("/get-electricity").subscribe({
      next: (res: any) => {
        this.dataSource2 = new MatTableDataSource(res)
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;

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
