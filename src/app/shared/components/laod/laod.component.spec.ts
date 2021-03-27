import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaodComponent } from './laod.component';

describe('LaodComponent', () => {
  let component: LaodComponent;
  let fixture: ComponentFixture<LaodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
