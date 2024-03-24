import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDatepicker } from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import { SheetsComponent } from 'src/app/sheets/sheets.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit{
  @ViewChild ('picker', {static:true}) picker!:MatDatepicker<any>
  minDate: Date;

  constructor(private session:ApiService,  private _bottomSheet: MatBottomSheet){
    this.minDate = new Date();
    this.user = this.session.get('qr-user', 'session')
    this.openBottomSheet()
  }
  ngAfterViewInit(): void {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(SheetsComponent);
  }

  user:any
}