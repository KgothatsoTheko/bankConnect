import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<SheetsComponent>) {}

  openLink(url: string): void {
    window.open(url, '_blank');
    this._bottomSheetRef.dismiss();
  }
}
