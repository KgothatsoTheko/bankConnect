import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLoading: boolean = false;
  isToolbarEnabled: boolean = true; 
  constructor(private router:Router){}
  menuItems: any =[
    
   {label:'profile', route:'/dashboard/profile'},
   {label:'Customers', route:'dashboard/customers'},
   {label:'Tasks', route:'/dashboard/tasks'},
   {label:'Leads', route:'/dashboard/leads'},
   {label:'Reports', route:'/dashboard/report'},
   {label:'Logout', route:'/Login'},

  ]

  ngOnInit() {
    this.disableToolbarIfQrCodeRoute();
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
    sessionStorage.clear()
   return  this.router.navigate(['Login'])
  }

}
