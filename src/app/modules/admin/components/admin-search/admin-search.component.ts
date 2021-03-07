import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'

interface Search {
  topic: string
}

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent implements OnInit {
  public formSearch = new FormControl()
  public filteredOptions: Observable<Search[]>
  public placeholder: boolean
  public options: Search[] = [
    { topic: 'Angular' },
    { topic: 'ReactJs' },
    { topic: 'NodeJs' }
  ]

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.formSearch.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.topic ),
      map(topic => topic ? this._filter(topic) : this.options.slice()),
      tap(() => {
        this.placeholder = !!this.formSearch.value
      })
    )
  }

  display(search: Search): string {
    return search && search.topic ? search.topic : ''
  }

  private _filter(topic: string): Search[] {
    const filters =  topic.toLowerCase()
    return this.options.filter(opt => opt.topic.toLowerCase().indexOf(filters) === 0)
  }
}
