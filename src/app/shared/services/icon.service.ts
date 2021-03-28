import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

import { ICONS } from '@shared/constants'


@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {

  }

  cards() {
    ICONS.CARDS.forEach(icon => {
      this.iconRegistry.addSvgIconInNamespace('card', icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`../../../assets/images/icons/${icon}.svg`)
      )
    })
  }
}
