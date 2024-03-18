import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  addTaskForm: FormGroup;
  isUpdate: boolean = false;

  constructor(private matDialogRef: MatDialogRef<AddTaskComponent>, private api: ApiService, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data:any) {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      taskType: new FormControl('', Validators.required)
    });
    if (data) {
      this.isUpdate = true;
      this.addTaskForm.patchValue(data)
      console.log("polulation", this.addTaskForm)
    }
  }

  cancel() {
    this.matDialogRef.close();
  }

  submit() {
    let formValue = this.addTaskForm.value;

    if (this.addTaskForm.invalid) {
      this.snackbar.open("fill in fields", "OK", { duration: 3000 })
      return
    }

    this.api.genericPost('/tasks', formValue).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log(this.addTaskForm.controls['date'].value)
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
    this.snackbar.open('Submitted successfully', "OK", { duration: 3000 });
  }
}
