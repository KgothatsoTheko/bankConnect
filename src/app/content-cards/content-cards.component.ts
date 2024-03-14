import { Component } from '@angular/core';

@Component({
  selector: 'app-content-cards',
  templateUrl: './content-cards.component.html',
  styleUrls: ['./content-cards.component.scss']
})
export class ContentCardsComponent {
  cards: any = [
    {label: 'Customers'},
    {label: 'Leads'},
    {label: 'Tasks'},
    {label: 'Reports'},
  ]
}
