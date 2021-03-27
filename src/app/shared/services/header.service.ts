import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { HeaderI } from '@shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  protected headerSource = new BehaviorSubject({})
  public headerCurrent = this.headerSource.asObservable()
  public header: HeaderI = environment.header

  constructor(private activated: ActivatedRoute) { }

  // load(data: any, params: any): void {
  load(activated: ActivatedRoute): void {
    const { data, params, queryParams } = activated.snapshot

    params && this.setParams(params)

    queryParams && this.setQuery(queryParams)

    if (data) {
      Object.keys(data).forEach(key => {
        if (key === 'subtitle') {
          this.setSubtitle(data[key])
        }
        if (key === 'title') {
          this.setTitle(data[key])
        }
        if (key === 'mode') {
          this.setMode(data[key])
        }
      })
    }
  }

  setTitle(title: string): void {
    this.changeHeader({...this.header, title })
  }

  setSubtitle(subtitle: string): void {
    this.changeHeader({...this.header, subtitle })
  }

  setMode(mode: string): void {
    this.changeHeader({...this.header, mode })
  }

  setParams(params: any): void {
    if (params) {
      this.changeHeader({...this.header, params: JSON.stringify(params) })
    }
  }

  setQuery(query: any): void {
    if (query) {
      this.changeHeader({...this.header, query: JSON.stringify(query) })
    }
  }

  clear(): void {
    this.changeHeader({ title: '', subtitle: '', mode: '', params: '', query: '' })
  }

  getParams(): any {
    const { params } = this.header
    return params ? JSON.parse(params) : null
  }

  getQuery(): any {
    const { query } = this.header
    return query ? JSON.parse(query) : null
  }

  private changeHeader(header: HeaderI): void {
    this.header = header
    this.headerSource.next(this.header)
  }
}
