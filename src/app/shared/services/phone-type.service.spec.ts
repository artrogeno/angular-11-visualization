import { TestBed } from '@angular/core/testing';

import { PhoneTypeService } from './phone-type.service';

describe('PhoneTypeService', () => {
  let service: PhoneTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
