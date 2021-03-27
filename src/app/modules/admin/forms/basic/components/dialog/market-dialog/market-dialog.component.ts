import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-market-dialog',
  templateUrl: './market-dialog.component.html',
  styleUrls: ['./market-dialog.component.scss']
})
export class MarketDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
