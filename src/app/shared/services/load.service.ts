import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { LoadI } from '@shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class Load {
  protected loadSource = new BehaviorSubject(environment.load)
  public loadCurrent = this.loadSource.asObservable()
  public load: LoadI = environment.load

  constructor() { }

  show(): void {
    this.load = { ...this.load, show: true}
    this.loadSource.next(this.load)
  }

  hide(): void {
    this.load = { ...this.load, show: false}
    setTimeout(() => {
      this.loadSource.next(this.load)
    }, 2000);
  }
}
