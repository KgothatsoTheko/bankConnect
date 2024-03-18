import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isLoading: boolean = false;
  constructor(private router:Router){}
  menuItems: any =[
   {label:'Customers', route:'dashboard/customers'},
   {label:'Tasks', route:'/dashboard/tasks'},
   {label:'Leads', route:'/dashboard/leads'},
   {label:'Reports', route:'/dashboard/reports'},
   {label:'Logout', route:'/Login'},

  ]

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
   return  this.router.navigate(['login'])
  }

}
