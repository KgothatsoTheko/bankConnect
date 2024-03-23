import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(private matdialog:MatDialogRef<DeleteComponent>, private api:ApiService
    , private snackbar:MatSnackBar){}

  confirmDelete(confirm: boolean) {
    this.matdialog.close(confirm);
  }
  
}
