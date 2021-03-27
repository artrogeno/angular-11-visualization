import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MarketDialogComponent } from '../dialog/market-dialog/market-dialog.component';

@Component({
  selector: 'market-information',
  templateUrl: './market-information.component.html',
  styleUrls: ['./market-information.component.scss']
})
export class MarketInformationComponent implements OnInit {

  @Input() formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (Object.keys(this.formGroup.controls).length === 0) {
      this.formGroup = this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null],
        birthDate: [null]
      })
    }
  }

  openMarketDialog(): void {
    const dialogRef = this.dialog.open(MarketDialogComponent, {
      data: {
        animal: 'panda'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      console.log({result})
    });
  }

}
