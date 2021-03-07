import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DollarWidgetComponent } from './dollar-widget.component';

describe('DollarWidgetComponent', () => {
  let component: DollarWidgetComponent;
  let fixture: ComponentFixture<DollarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DollarWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DollarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
