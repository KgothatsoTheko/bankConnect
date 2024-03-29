import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {

  DOB!:string;
  ID:any;
  Date:any;
  year!: any;
  month!: string;
  day!: string;
  gender:any;
  age:any;
  citizen:any;
  isUpdate: boolean = false;
  qrCodeData: string = '';

registerForm: FormGroup

constructor(
   private fb:FormBuilder, private snackbar:MatSnackBar, private api:ApiService, private router:Router){
  this.registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    DOB: new FormControl(this.year+this.month+this.day,[Validators.required]),
    age: new FormControl(this.age,[Validators.required]),
    ID: new FormControl('',[Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    citizenship: new FormControl(this.citizen,[Validators.required]),
    gender: new FormControl(this.gender,Validators.required),
    contact: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
  })
this.Date = new Date().getFullYear()
}

getPasswordStrengthColor(color: string): string {
  const password = this.registerForm.get('password')?.value || '';
  const passwordLength = password.length;

  if (passwordLength >= 8 && color === 'green') {
      return 'green'; 
  } else if (passwordLength >= 6 && color === 'yellow') {
      return 'yellow'; 
  } else if (passwordLength >= 4 && color === 'red') {
      return 'red'; 
  } else {
      return 'grey'; 
  }
}


ngOnInit() {
  this.year = 'YY';
  this.month = 'MM';
  this.day = 'DD';
  this.registerForm.reset()
  sessionStorage.clear()
}

submit(){
  console.log(this.registerForm.value)
  let formValue = this.registerForm.value;

  if (this.registerForm.invalid) {
    this.snackbar.open("fill in fields", "OK", { duration: 3000 })
    return
  }

  this.api.genericPost('/add-admin', formValue).subscribe({
    next: (res: any) => {
      console.log(res);
      sessionStorage.setItem('qr-user', JSON.stringify(res));
    },
    error: (err: any) => console.log("error", err),
    complete: () => { }
  });

  
 this.snackbar.open('Submitted successfully', "OK", { duration: 3000 });
  this.router.navigate(['Login'])
 
}

login(){
  this.router.navigate(['/Login'])
}

IdValid() {
 
  this.DOB = this.registerForm.controls['ID'].value.toString(); 
 console.log(this.DOB);
 this.year = "19" + this.DOB.slice(0, 2);
 console.log(this.year)
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

cancel(){
  this.registerForm.reset()
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

generateQRCode() {
  const dataFromStorage = sessionStorage.getItem('qr-user');
  if (dataFromStorage) {
    this.qrCodeData = dataFromStorage;
  }

}

}
