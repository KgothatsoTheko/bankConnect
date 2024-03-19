import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LeadsComponent } from './components/leads/leads.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'qrCode', component: QrCodeComponent },
      {path: 'profile', component: EmployeesComponent}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
