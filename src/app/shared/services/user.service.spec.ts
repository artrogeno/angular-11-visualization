import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';
import { UserI } from '@shared/interfaces/user';
import { API } from '@shared/constants/api';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController

  let responseMock: UserI[] = [
    {id: 1, name: 'Magda', email: 'magda@mail.com'},
    {id: 1, name: 'Giulia', email: 'giulia@mail.com'},
    {id: 1, name: 'Arthur', email: 'arthur@mail.com'},
  ]

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should test list', () => {
    service.list().subscribe((res: UserI[]) => {
      expect(res).toEqual(responseMock)
    })

    const req = httpMock.expectOne(API.USER)

    expect(req.request.method).toBe('GET')
    expect(req.cancelled).toBeFalsy()

    req.flush(responseMock)
  })
});
