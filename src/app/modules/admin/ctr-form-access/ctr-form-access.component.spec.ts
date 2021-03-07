import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrFormAccessComponent } from './ctr-form-access.component';

describe('CtrFormAccessComponent', () => {
  let component: CtrFormAccessComponent;
  let fixture: ComponentFixture<CtrFormAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtrFormAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrFormAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
