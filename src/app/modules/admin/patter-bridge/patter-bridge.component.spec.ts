import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatterBridgeComponent } from './patter-bridge.component';

describe('PatterBridgeComponent', () => {
  let component: PatterBridgeComponent;
  let fixture: ComponentFixture<PatterBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatterBridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatterBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
