import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{
  @ViewChild ('picker', {static:true}) picker!:MatDatepicker<any>
  minDate: Date;

  constructor(private session:ApiService){
    this.minDate = new Date();
    this.user = this.session.get('qr-user', 'session')
  }

  user:any

 ngOnInit(): void {
    // Open the datepicker when the component initializes
    setTimeout(() => {
      this.picker.open();
    });
  }

}
