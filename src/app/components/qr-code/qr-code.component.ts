import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  @Input() qrData: string = '';
  public myAngularxQrCode: string = '';
  public qrCodeDownloadLink: SafeUrl = '';
  public login: boolean = false;
  parsedData: any; // Object to hold parsed data
  user: any;

  constructor(private router: Router, private service: ApiService) {}
  isLoading: boolean = false;
  istext: boolean = true; 
  isQR:boolean = true;

  ngOnInit(): void {
    this.myAngularxQrCode = sessionStorage.getItem('qr-user') || '';
    this.user = this.service.get('qr-user', 'session');
    console.log('Stored user data:', this.user);
    console.log('Parsed QR data:', this.parseQRData());

    this.disableToolbarIfQrCodeRoute()
    this.disableTextfQrCodeRoute()
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  viewData(action: any) {
    console.log(action.data.value.toString());
    this.router.navigate(['/dashboard/profile']);
  }

  parseQRData() {
    if (this.qrData) {
      this.parsedData = JSON.parse(this.qrData);
      this.checkDataMatch();
      return this.parsedData;
    }
  }

  checkDataMatch() {
    if (this.user && this.parsedData) {
      if (JSON.stringify(this.user) === JSON.stringify(this.parsedData)) {
        console.log('QR code data matches session storage data');
        alert("yes")
      } else {
        console.log('QR code data does not match session storage data');
        alert("no")

      }
    }
  }

  disableToolbarIfQrCodeRoute() {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard/profile') {
      this.istext = false;
    } else {
      this.istext = true;
    }
  }

  disableTextfQrCodeRoute() {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard/qrCode') {
      this.isQR = false;
    } else {
      this.isQR = true;
    }
  }
  
}
