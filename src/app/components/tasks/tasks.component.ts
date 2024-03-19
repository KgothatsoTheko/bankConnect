import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/forms/add-task/add-task.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent  {
  displayedColumns: string[] = ['taskName', 'Owner', 'date', 'start_time', 'end_time', 'status', 'task_type'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource!: MatTableDataSource<any>;

  constructor(private matdialog: MatDialog, private api: ApiService, private snackbar:MatSnackBar) { 
    this.getTasks();
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
    this.matdialog.open(AddTaskComponent, {
      width: '35vw',
      maxWidth: '50vw'
    });
  }

  
  check(row: any) {
    const updatedStatus = row.status; 
    const taskId = row._id; 

    this.api.genericPost('/update-task/' + taskId, { status: updatedStatus }).subscribe({
      next: (res: any) => {
        console.log('Update successful:', res);
        // Refresh the tasks list after update if needed
        this.getTasks();
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
      }
    });
  }
}
