import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  addTaskForm: FormGroup
constructor(private matDialogRef:MatDialogRef<AddTaskComponent>){
  this.addTaskForm = new FormGroup({
    taskName: new FormControl('',Validators.required),
    owner: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    start_date: new FormControl('',[Validators.required]),
    end_date: new FormControl('',[Validators.required]),
    start_time: new FormControl('',[Validators.required]),
    end_time: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required]),
    task_type: new FormControl('',[Validators.required]),
    
  })
}

cancel(){
  this.matDialogRef.close()
}
}
