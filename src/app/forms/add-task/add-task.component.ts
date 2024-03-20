import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'; // Import ValidatorFn and AbstractControl
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
  minDate: Date;
  defaultStartTime: string = '08:00'; 
  defaultEndTime: string = '17:00'; 

  constructor(private matDialogRef: MatDialogRef<AddTaskComponent>, private api: ApiService, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data:any) {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      startTime: new FormControl(this.defaultStartTime, Validators.required),
      endTime: new FormControl(this.defaultEndTime, Validators.required),
      status: new FormControl('', Validators.required),
      taskType: new FormControl('', Validators.required)
    }, { validators: this.timeValidator as ValidatorFn });
    if (data) {
      this.isUpdate = true;
      this.addTaskForm.patchValue(data)
      console.log("polulation", this.addTaskForm)
    }
   
    this.minDate = new Date();
  }

  timeValidator(form: FormGroup) {
    const startTimeControl = form.get('startTime');
    const endTimeControl = form.get('endTime');
  
    const startTime = startTimeControl?.value;
    const endTime = endTimeControl?.value;

    if (startTime && endTime) {
      const startTimeValue = new Date(`1970-01-01T${startTime}`);
      const endTimeValue = new Date(`1970-01-01T${endTime}`);

      if (startTimeValue >= endTimeValue) {

        startTimeControl.setErrors({ 'invalidTime': true });
        endTimeControl.setErrors({ 'invalidTime': true });
      } 
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
      },
      error: (err: any) => console.log("error", err),
      complete: () => { }
    });
    this.matDialogRef.close()
    this.snackbar.open('Submitted successfully', "OK", { duration: 3000 });
  }
}
