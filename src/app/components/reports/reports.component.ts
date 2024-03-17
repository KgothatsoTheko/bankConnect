import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  displayedColumns: string[] = ['Customer', 'Contact', 'Interactions Type', 'Date & Time', 'Employee', 'Outcome'];
  dataSource = [
    { customer: 1, contact: 'Hydrogen', type: 1.0079, date: 'H', employee: 'Ally', outcome: 'approved' },
    { customer: 2, contact: 'Helium', type: 4.0026, date: 'He', employee: 'Shimmy', outcome: 'approved' },
    { customer: 3, contact: 'Lithium', type: 6.941, date: 'Li', employee: 'Katlego', outcome: 'approved' },
  ];

  constructor() { }

  ngOnInit(): void {
   
  }
}
