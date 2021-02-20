import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ FooterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link', () => {
    const selector = fixture.nativeElement.querySelectorAll('footer a')
    expect(selector[0]['href']).toContain('https://github.com/Artrogeno')
  })

  it('should have a title inside the link', () => {
    const selector = fixture.nativeElement.querySelectorAll('footer a')
    expect(selector[0].innerText).toContain('Artrogeno')
  })

  it('should show span have a year', () => {
    const selector = fixture.nativeElement.querySelectorAll('footer span')
    expect(selector[0].innerText).toContain(String(new Date().getFullYear()))
  })
});
