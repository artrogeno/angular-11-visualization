import { TestBed } from '@angular/core/testing';

import { Load } from './load.service';

describe('Load', () => {
  let service: Load;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Load);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
