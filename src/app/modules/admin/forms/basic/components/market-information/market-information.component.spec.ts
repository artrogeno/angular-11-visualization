import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInformationComponent } from './market-information.component';

describe('MarketInformationComponent', () => {
  let component: MarketInformationComponent;
  let fixture: ComponentFixture<MarketInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
