import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TermsDialogComponent } from '../dialog/terms-dialog/terms-dialog.component';

@Component({
  selector: 'system-information',
  templateUrl: './system-information.component.html',
  styleUrls: ['./system-information.component.scss']
})
export class SystemInformationComponent implements OnInit {

  @Input() formGroup: FormGroup

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openTermsDialog(): void {
    const dialogRef = this.dialog.open(TermsDialogComponent, {
      data: {
        terms: this.formGroup.controls.terms.value
      }
    })

    dialogRef.afterClosed().subscribe(terms => {
      this.formGroup.controls.terms.setValue(terms)
    })
  }
}
