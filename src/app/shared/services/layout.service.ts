import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { LayoutI } from '@shared/interfaces/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  protected layoutSource = new BehaviorSubject(environment.layout)
  public layoutCurrent = this.layoutSource.asObservable()
  public layout: LayoutI = environment.layout

  constructor() { }

  private changeLayout(layout: LayoutI): void {
    this.layout = layout
    this.layoutSource.next(this.layout)
  }

  toggleSidebar(): void {
    const layout = { ...this.layout, sidebar: !this.layout.sidebar }
    this.changeLayout(layout)
  }

  showLoading(): void {
    this.setLoading(true)
  }

  hideLoading(): void {
    setTimeout(() => {
      this.setLoading(false)
    }, 2000);
  }

  private setLoading(loading: boolean) {
    const layout = { ...this.layout, loading }
    this.changeLayout(layout)
  }

}
