import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-market-dialog',
  templateUrl: './market-dialog.component.html',
  styleUrls: ['./market-dialog.component.scss']
})
export class MarketDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  noAgree(): void {
    this.dialogRef.close(false)
  }

  agree(): void {
    this.dialogRef.close(true)
  }
}
