import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LeadsComponent } from './components/leads/leads.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminRegisterComponent } from './forms/admin-register/admin-register.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'qrCode', component: QrCodeComponent },
      { path: 'profile', component: EmployeesComponent },
      { path: 'report', component: ReportsComponent },
    ]
  },
  { path: 'registration', component: AdminRegisterComponent },
  { path: 'welcome', component: WelcomeMessageComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
