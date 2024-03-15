import { Component } from '@angular/core';

@Component({
  selector: 'app-content-cards',
  templateUrl: './content-cards.component.html',
  styleUrls: ['./content-cards.component.scss']
})
export class ContentCardsComponent {
  cards: any = [
    { label: 'Customers', img: '../../assets/images/customers.png' },
    { label: 'Leads', img: '../../assets/images/Leads.png' },
    { label: 'Tasks', img: '../../assets/images/tasks.png' },
    { label: 'Reports', img: '../../assets/images/reports.png' }
  ];
}
