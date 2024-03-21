import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})
export class WelcomeMessageComponent {
constructor(private service:ApiService, private router: Router, private cdr: ChangeDetectorRef){
  this.user = this.service.get('qr-user', 'session')
}

transition: boolean = false;
user:any;

ngAfterViewInit(): void {
  this.transition = true;
  this.cdr.detectChanges();

  setTimeout(() => {
    this.router.navigate(['dashboard/profile']);
  }, 5000);
}
}
