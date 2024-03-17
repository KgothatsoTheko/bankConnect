import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {path: '',redirectTo: '/Login',pathMatch:'full'},
  {path: 'Login',component:ReportsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
