import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ICONS, MASK } from '@shared/constants';
import { IconService } from '@shared/services';
import { MarketDialogComponent } from '../dialog/market-dialog/market-dialog.component';

@Component({
  selector: 'market-information',
  templateUrl: './market-information.component.html',
  styleUrls: ['./market-information.component.scss']
})
export class MarketInformationComponent implements OnInit {

  @Input() formGroup: FormGroup

  creditCardTypes: Observable<string[]>;

  cardMask = MASK.CARD

  constructor(
    public dialog: MatDialog,
    private iconService: IconService
  ) {
    this.iconService.cards()
  }

  get commerceForm(): FormGroup {
    return <FormGroup>this.formGroup.controls.commerce
  }

  ngOnInit(): void {
    this.observableForm()
  }

  openMarketDialog(): void {
    const dialogRef = this.dialog.open(MarketDialogComponent, {
      data: {
        terms: this.formGroup.controls.terms.value
      }
    })

    dialogRef.afterClosed().subscribe(terms => {
      this.formGroup.controls.terms.setValue(terms)
    })
  }

  getCardIcon(): string {
    if (this.formGroup.controls && this.commerceForm) {
      if (this.commerceForm.controls.creditCardType) {
        const icon = this.commerceForm.controls.creditCardType.value
        return `card:${ICONS.CARDS.includes(icon) ? icon : 'default'}`
      }
    }
    return 'card:default'
  }

  private observableForm(): void {
    this.observableCardType()
  }

  private observableCardType(): void {
    this.creditCardTypes = this.commerceForm.controls.creditCardType.valueChanges.pipe(
      startWith(''),
      map(type => ICONS.CARDS.filter(item => item.toLowerCase().indexOf(type.toLowerCase()) === 0))
    )
  }
}
