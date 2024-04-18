import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  isLinear = false;
  constructor(private dialog: MatDialog) {

  }

  @Output() onEmailSubmit: EventEmitter<string> = new EventEmitter();
  @Output() onCodeSubmit = new EventEmitter();

  @Input()
  emailSubmitted: boolean = false;

  @Input()
  passwordResetSuccessful: boolean = false;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  confirmCodeForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required]),
    confirmationCode: new FormControl('', [Validators.required]),
  });

  submitEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')!.value;
      console.log('const', email)
      this.confirmCodeForm.get('email')!.setValue(email);
      // console.log('THE EMAIL IS: ', this.confirmCodeForm.get('email').value);
      this.onEmailSubmit.emit(email);
      this.confirmCodeForm.updateValueAndValidity();
    }
  }

  submitCode() {
    if (this.confirmCodeForm.valid) {
      this.onCodeSubmit.emit(this.confirmCodeForm.value);
    }
  }
}
