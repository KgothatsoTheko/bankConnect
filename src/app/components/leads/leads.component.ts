import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
  isLeftDisabled: boolean = true;
  isRightDisabled: boolean = false;
  
  @ViewChild('content') content!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  leads:any;

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
        this.leads = res;
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


}




