import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit{
  @Input() qrData: string = ''
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  public login:boolean = false;
  parsedData: any; // Object to hold parsed data

  
  constructor (private router: Router ) {
    // assign a value
    this.myAngularxQrCode = sessionStorage.getItem('qr-user') || '';

    console.log(this.myAngularxQrCode);
    console.log(this.parseQRData());

  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

ngOnInit(): void {
  this.parseQRData()
}

  viewData(action:any) {
    console.log(action.data.value.toString())
    this.router.navigate(['/Login'])
  }

  parseQRData() {
    if (this.qrData) {
      this.parsedData = JSON.parse(this.qrData);
    return  console.log('Parsed Data:', this.parsedData);
    }
  }
}
