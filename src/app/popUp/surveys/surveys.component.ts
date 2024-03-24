import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent {
  constructor(private dialogRef: MatDialogRef<SurveysComponent>, private service: ApiService) {
    this.count();
  }

  comments: any[] = [];

  count() {
    this.service.genericGet('/get-feedback').subscribe({
      next: (res: any) => {
        console.log(res);
        // Extract only the 'message' property from each item in the response array
        this.comments = res.map((item: any) => item.message);
        console.log(this.comments)
      },
      error: (err: any) => console.error("Error:", err),
      complete: () => {}
    });
  }
}
