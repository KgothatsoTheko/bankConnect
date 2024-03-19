import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddTaskComponent } from 'src/app/forms/add-task/add-task.component';
import { RegisterLeadComponent } from 'src/app/forms/register-lead/register-lead.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {
  displayedColumns: string[] = ['name','surname', 'gender', 'ID', 'actions'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private api:ApiService, private snackbar:MatSnackBar) {
    this.getLeads()
  }

  dataSource!: MatTableDataSource<any>;

  getLeads() {
    this.api.genericGet('/get-lead').subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  isEdit!:boolean

  edit(row: any): void {
    const action = this.isEdit ? 'Edit' : 'View Profile';
  
    const dialogRef = this.dialog.open(RegisterLeadComponent, { 
      data: { ...row, action: action } 
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (!result) {
        this.snackbar.open('Update was closed', 'Ok', { duration: 3000 })
      } else {
        this.snackbar.open(result, 'Ok', { duration: 3000 })
      }
    });
    this.update(row)
  }

  register(){
    this.dialog.open(RegisterLeadComponent,{
      width: '50vw',
      maxWidth: '100vw'})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(row:any){
    const updatedLead = this.displayedColumns; 
    const leadId = row._id; 

    this.api.genericPost('/leads', updatedLead).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
}



}




