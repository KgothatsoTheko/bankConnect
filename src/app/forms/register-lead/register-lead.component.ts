import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-lead',
  templateUrl: './register-lead.component.html',
  styleUrls: ['./register-lead.component.scss']
})
export class RegisterLeadComponent {
  @Output() leadAdded = new EventEmitter<any>();
  @Output() leadUpdated = new EventEmitter<any>();
  DOB!: string;
  ID: any;
  Date: any;
  year!: any;
  month!: string;
  day!: string;
  gender: any;
  age: any;
  citizen: any;
  isUpdate: boolean = false;
  isEdit: boolean = false;

  registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<RegisterLeadComponent>,
    private fb: FormBuilder, private snackbar: MatSnackBar, private api: ApiService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      DOB: ['', Validators.required],
      age: ['', Validators.required],
      ID: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      email: [''],
      citizenship: ['', Validators.required],
      gender: ['', Validators.required],
      Source: ['', Validators.required],
      contact: ['']
    });

    this.Date = new Date().getFullYear();

    if (data) {
      this.isEdit = true; // Set isEdit to true for update operation
      this.registerForm.patchValue(data);
    }
    this.registerForm.patchValue(data);
  }
  

  IdValid() {
    this.DOB = this.registerForm.controls['ID'].value.toString();
    this.year = "19" + this.DOB.slice(0, 2);
    this.month = this.DOB.slice(2, 4);
    this.day = this.DOB.slice(4, 6);

    this.citizenship();
    this.genders();
    this.age = this.ageCalc();

    this.registerForm.patchValue({
      DOB: this.year + this.month + this.day,
      age: this.age,
      gender: this.gender,
      citizenship: this.citizen
    });
  }

  submit() {
    const formValue = this.registerForm.value;
  
    // Check form validity and perform other validations
  
    if (this.isEdit) {
      // Update existing lead
      this.api.genericPost('/update-lead/' + this.data.name, formValue).subscribe({
        next: (res: any) => {
          console.log(res);
          this.leadUpdated.emit(res);
          this.matDialogRef.close();
          this.snackbar.open('Lead updated successfully', 'OK', { duration: 3000 });
        },
        error: (err: any) => {
          console.log("error", err);
          this.snackbar.open('Error updating lead', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.api.genericPost('/leads', formValue).subscribe({
        next: (res: any) => {
          console.log(res);
          this.matDialogRef.close({ leads: res })
          this.leadAdded.emit(res); 
          this.matDialogRef.close();
          this.snackbar.open('Lead added successfully', 'OK', { duration: 3000 });
        },
        error: (err: any) => {
          console.log("error", err);
          this.snackbar.open('Error adding lead', 'OK', { duration: 3000 });
        }
      });
    }
  }
  

  cancel() {
    this.matDialogRef.close();
  }

  genders() {
    this.gender;
    if (parseInt(this.DOB.charAt(6), 10) >= 5) {
      this.gender = "male";
    } else {
      this.gender = 'female';
    }
  }

  citizenship() {
    let C = this.DOB.slice(10, 11);
    this.citizen;
    if (C === "0") {
      this.citizen = "South African";
    } else {
      this.citizen = "not South African";
    }
  }

  ageCalc() {
    let answer = new Date().getFullYear() - this.year;
    return answer;
  }
}
