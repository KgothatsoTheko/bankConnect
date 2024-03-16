import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-lead',
  templateUrl: './register-lead.component.html',
  styleUrls: ['./register-lead.component.scss']
})
export class RegisterLeadComponent {
DOB!:string;
  ID:any;
  Date:any;
  year!: any;
  month!: string;
  day!: string;
  gender:any;
  age:any;
  citizen:any;

registerForm: FormGroup

constructor(private matDialogRef: MatDialogRef<RegisterLeadComponent>, private fb:FormBuilder){
  this.registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    DOB: new FormControl(this.year+this.month+this.day,[Validators.required]),
    age: new FormControl(this.age,[Validators.required]),
    ID: new FormControl('',[Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    email: new FormControl(''),
    citizenship: new FormControl(this.citizen,[Validators.required]),
    gender: new FormControl(this.gender,Validators.required),
    reference: new FormControl('',[Validators.required]),
    contact: new FormControl('')
  })
this.Date = new Date().getFullYear()
}

IdValid() {
   this.DOB = this.registerForm.controls['ID'].value.toString(); 
  console.log(this.DOB);
  this.year = "19" + this.DOB.slice(0, 2);
  this.month = this.DOB.slice(2, 4);
  this.day = this.DOB.slice(4, 6);
 
  this.citizenship()
  this.genders()
  this.age = this.ageCalc()

  this.registerForm.patchValue({
    DOB: this.year + this.month + this.day,
    age: this.age,
    gender: this.gender,
    citizenship: this.citizen
  });
}

submit(){
  console.log(this.registerForm.value)
}

cancel(){
  this.matDialogRef.close()
}

genders(){
  this.gender;
  if (parseInt(this.DOB.charAt(6), 10) >= 5) {
    this.gender = "male";
  } else {
    this.gender = 'female';
  }
}

citizenship(){
  let C = this.DOB.slice(10, 11);
  this.citizen;
  if (C === "0") {
    this.citizen = "South African";
  } else {
    this.citizen = "not South African";
  }
}

ageCalc(){
     let answer =  new Date().getFullYear() - this.year
     return answer
}
}
