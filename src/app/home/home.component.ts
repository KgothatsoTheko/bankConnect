import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLogo: boolean = true
constructor(private router:Router){
  this.disableToolbarIfQrCodeRoute()
}

disableToolbarIfQrCodeRoute() {
  const currentRoute = this.router.url;
  if (currentRoute === '/dashboard/home') {
    this.isLogo = false;
  } else {
    this.isLogo = true;
  }
}
}
