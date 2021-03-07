import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinWidgetComponent } from './bitcoin-widget.component';

describe('BitcoinWidgetComponent', () => {
  let component: BitcoinWidgetComponent;
  let fixture: ComponentFixture<BitcoinWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
