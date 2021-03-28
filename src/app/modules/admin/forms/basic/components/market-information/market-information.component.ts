import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ICONS, MASK } from '@shared/constants';
import { IconService } from '@shared/services';

@Component({
  selector: 'market-information',
  templateUrl: './market-information.component.html',
  styleUrls: ['./market-information.component.scss']
})
export class MarketInformationComponent implements OnInit {

  @Input() formGroup: FormGroup

  creditCardTypes: Observable<string[]>;

  cardMask = MASK.CARD

  constructor(private iconService: IconService) {
    this.iconService.cards()
    this.iconService.currency()
  }

  get commerceForm(): FormGroup {
    return <FormGroup>this.formGroup.controls.commerce
  }

  ngOnInit(): void {
    this.observableForm()
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
