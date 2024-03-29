import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLogo: boolean = true
  isLoading: boolean = false;
  isToolbarEnabled: boolean = true; 
  constructor(private router:Router){
    this.disableLogoQrCodeRoute()
  }
  menuItems: any =[
    
   {label:'Profile', route:'/dashboard/profile'},
   {label:'Customers', route:'/dashboard/customers'},
   {label:'Tasks', route:'/dashboard/tasks'},
   {label:'Leads', route:'/dashboard/leads'},
   {label:'Reports', route:'/dashboard/report'},
   {label:'Logout', route:'/Login'},

  ]

  ngOnInit() {
    this.disableToolbarIfQrCodeRoute();
    this.disableLogoQrCodeRoute()
  }

  disableLogoQrCodeRoute() {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard/home') {
      this.isLogo = false;
    } else {
      this.isLogo = true;
    }
  }

  disableToolbarIfQrCodeRoute() {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard/qrCode') {
      this.isToolbarEnabled = false;
    } else {
      this.isToolbarEnabled = true;
    }
  }

  disable(){

  }

  animation() {
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  landing() {
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard/home'])
    }, 2000);
  }

  logout(){
  this.router.navigate(['Login'])
  }

}
