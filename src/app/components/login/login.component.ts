import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  
  public login:boolean = false;
  parsedData: any; // Object to hold parsed data

  signInForm: FormGroup;
  constructor(private service:ApiService, private snackbar:MatSnackBar, private router: Router){
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    })
  }

  QRcode(){
    this.router.navigate(['dashboard/qrCode'])
  }
  

  submit(){

    if(this.signInForm.invalid){
      this.snackbar.open("fill in the form")
    }
    
    this.service.genericGet('/get-admin').subscribe({
      next: (res: any) => {
        const user = res.find((admin: any) => admin.email == this.signInForm.controls['email'].value);
        if (user) {
          this.snackbar.open('User exists', 'OK', { duration: 3000 });
          sessionStorage.setItem('qr-user', JSON.stringify(user));
          this.router.navigate(['welcome'])
  }else{
   this.snackbar.open("Invalid email or Password", "OK", {duration:3000})
  }
}
    })
  }
}
