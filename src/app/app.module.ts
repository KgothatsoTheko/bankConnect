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
import { ReportsComponent } from './components/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';

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
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
