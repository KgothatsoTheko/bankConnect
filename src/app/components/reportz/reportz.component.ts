import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SurveysComponent } from 'src/app/popUp/surveys/surveys.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reportz',
  templateUrl: './reportz.component.html',
  styleUrls: ['./reportz.component.scss']
})
export class ReportzComponent {
constructor(private matdialog:MatDialog, private api: ApiService){
  this.getLeads()
}
leadsCount: number = 0;


survey(){
  this.matdialog.open(SurveysComponent)
}

getLeads() {
  this.api.genericGet('/get-lead').subscribe({
    next: (res: any) => {
      this.leadsCount = res.length;
    },
    error: (error: any) => {
      console.error('Error:', error);
    }
  });
}

}
