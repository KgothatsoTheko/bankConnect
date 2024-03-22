import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/forms/add-task/add-task.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { SheetsComponent } from 'src/app/sheets/sheets.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent  {
  displayedColumns: string[] = ['taskName', 'Owner', 'date', 'start_time', 'end_time', 'status', 'task_type'];

  statuses: string[] = ['completed', 'pending']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource!: MatTableDataSource<any>;

  constructor(private matdialog: MatDialog, private api: ApiService, private snackbar:MatSnackBar,
    private _bottomSheet: MatBottomSheet,) { 
    this.getTasks();
  }

  selectDisabled: boolean = false;

  

  openBottomSheet(): void {
    this._bottomSheet.open(SheetsComponent);
  }

  getTasks() {
    this.api.genericGet('/get-task').subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTask() {
    const dialogRef = this.matdialog.open(AddTaskComponent, {
      width: '35vw',
      maxWidth: '50vw'
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.task) {
        // Append the new task to the existing data source
        const newData = [...this.dataSource.data, result.task];
        this.dataSource.data = newData;
      }
    });
  }
  
  check(row: any) {
    const updatedStatus = row.status; 
    const taskId = row._id; 

    this.api.genericPost('/update-task/' + taskId, { status: updatedStatus }).subscribe({
      next: (res: any) => {
        console.log('Update successful:', res);
        this.getTasks();
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
      }
    });
  }
}
