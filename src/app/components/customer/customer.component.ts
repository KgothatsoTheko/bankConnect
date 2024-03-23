import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterLeadComponent } from 'src/app/forms/register-lead/register-lead.component';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {

  displayedColumns: string[] = ['name', 'surname', 'ID', 'email', 'gender','contact','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api: ApiService,private snackbar:MatSnackBar) {
    this.getCustomers();
  }

 
  getCustomers() {
    this.api.genericGet("/get-customer").subscribe({
      next:(res:any) =>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(res)
      },
      error: (error : any) =>{
        console.log('Error',error)
      }
    })
  }
  isEdit!:boolean

  edit(row: any): void {
    const dialogRef = this.dialog.open(CustomerEditComponent, { 
      data: { ...row, action: 'Edit' } 
    });
    dialogRef.componentInstance.customerUpdated.subscribe((updatedCustomer: any) => {
      const index = this.dataSource.data.findIndex((customer: any) => customer.email === updatedCustomer.name);

      if (index !== -1) {
        this.dataSource.data[index] = updatedCustomer;
        this.dataSource._updateChangeSubscription();
      }
    });
  
    dialogRef.afterClosed().subscribe(result => { 
      if (!result) {
        this.snackbar.open('Update was closed', 'Ok', { duration: 3000 });
      } else {
        this.snackbar.open(result, 'Ok', { duration: 3000 });
      }
    });
  }

  update(row:any){
    const updatedCustomer = this.displayedColumns; 
    const leadId = row._id; 

    this.api.genericPost('/get-customer', updatedCustomer).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
  }

    // delete(index: number){
    //   console.log(index)
    //   // let allCustomers =  this.getCustomers();
    //   // console.log('customers', allCustomers)
    //   // let tt = this.getCustomers().splice(index, 1)
  
    // }

    delete(row: any) {
      const email = row.email; 
      this.api.genericDelete(`/delete-customer/${email}`).subscribe({
        next: (res: any) => {
          this. getCustomers();
          this.snackbar.open('Customer deleted successfully', 'Ok', { duration: 3000 });
        },
        error: (error: any) => {
          this.snackbar.open('Error deleting customer', 'Ok', { duration: 3000 });
        }
      });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  exportToExcel(): void {
   let element = document.getElementById('customer')

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "Customers.xlsx");
  }


}