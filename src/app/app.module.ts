import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './components/customer/customer.component';
import { ToolbarComponent } from './sharedComponents/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarComponent } from './charts/bar/bar.component';
import { ContentCardsComponent } from './content-cards/content-cards.component';
import { NgChartsModule } from 'ng2-charts';
import { DemographLineComponent } from './charts/demograph-line/demograph-line.component';
import { LeadsComponent } from './components/leads/leads.component';
import { RegisterLeadComponent } from './forms/register-lead/register-lead.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksBarComponent } from './charts/tasks-bar/tasks-bar.component';
import { TasksDoughnutComponent } from './charts/tasks-doughnut/tasks-doughnut.component';
import { AddTaskComponent } from './forms/add-task/add-task.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { SheetsComponent } from './sheets/sheets.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CalendarModule, DateAdapter } from 'angular-calendar'; // Import CalendarModule here
import { EmployeesComponent } from './components/employees/employees.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    ToolbarComponent,
    DashboardComponent,
    BarComponent,
    ContentCardsComponent,
    DemographLineComponent,
    LeadsComponent,
    RegisterLeadComponent,
    HomeComponent,
    CarouselComponent,
    TasksComponent,
    TasksBarComponent,
    TasksDoughnutComponent,
    AddTaskComponent,
    ReportsComponent,
    SheetsComponent,
    QrCodeComponent,
    EmployeesComponent,
    // NgxQRCodeModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule,
    MatBottomSheetModule,
    QRCodeModule,
    NgxScannerQrcodeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), // Pass adapterFactory to forRoot() method
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
