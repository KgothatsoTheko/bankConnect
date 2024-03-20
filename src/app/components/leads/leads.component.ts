import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterLeadComponent } from 'src/app/forms/register-lead/register-lead.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {
  displayedColumns: string[] = ['name', 'surname', 'gender', 'ID', 'actions'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService, private snackbar: MatSnackBar) {
    this.getLeads();
  }

  getLeads() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  edit(row: any): void {
    const dialogRef = this.dialog.open(RegisterLeadComponent, { 
      data: { ...row, action: 'Edit' } 
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (!result) {
        this.snackbar.open('Update was closed', 'Ok', { duration: 3000 });
      } else {
        this.snackbar.open(result, 'Ok', { duration: 3000 });
      }
    });
  }
  

  register() {
    this.dialog.open(RegisterLeadComponent, {
      width: '35vw',
      maxWidth: '100vw'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(row: any) {
    const email = row.email; 
    this.api.genericDelete(`/leads/${email}`).subscribe({
      next: (res: any) => {
        console.log('Lead deleted successfully:', res);
        this.getLeads();
        this.snackbar.open('Lead deleted successfully', 'Ok', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error deleting lead:', error);
        this.snackbar.open('Error deleting lead', 'Ok', { duration: 3000 });
      }
    });
  }
}
