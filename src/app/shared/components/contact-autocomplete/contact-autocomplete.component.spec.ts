import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAutocompleteComponent } from './contact-autocomplete.component';

describe('ContactAutocompleteComponent', () => {
  let component: ContactAutocompleteComponent;
  let fixture: ComponentFixture<ContactAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
