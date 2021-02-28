import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { API } from '@shared/constants/api'
import { ILogin, ILoginResponse } from '@shared/interfaces/login'
import { AuthService } from './auth.service'
import { environment } from '@environments/environment'
import { Router } from '@angular/router'

fdescribe('AuthService', () => {
  let service: AuthService
  let httpMock: HttpTestingController
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  let responseMock: ILoginResponse = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFydGh1ciBTaWx2YSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJleHAiOjE2NDQ1NTA4OTl9.BKx2yKdzMoY85W5lGakX8dJGqdqIvX3BUD4AQtxIRLs'}
  const credentialMock: ILogin = { email: 'admin@mail.com', password: '123456 '}
  const payloadMock = {
    sub: "1234567890",
    name: "Arthur Silva",
    email: "admin@mail.com",
    exp: 1644550899
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    })
    service = TestBed.inject(AuthService)
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController)

    let store = {}
    const localStorageMock = {
      getItem: (key: string) => {
        return store ? store[key] : null
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`
      },
      removeItem: (key: string) => {
        delete store[key]
      }
    }

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem)
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem)
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('signIn', () => {
    it('should test signIn', () => {
      service.signIn(credentialMock).subscribe((res: ILoginResponse) => {
        expect(res).toEqual(responseMock)
      })

      const req = httpMock.expectOne(API.SIGNIN)

      expect(req.request.method).toBe('POST')
      expect(req.cancelled).toBeFalsy()

      req.flush(responseMock)
    })
  });

  describe('logout', () => {
    it('should be remove token in localstorange and redirect to home', () => {
      localStorage.setItem(environment.lsToken, responseMock.token)
      service.logout()

      expect(localStorage.getItem(environment.lsToken)).toBeFalsy()
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    })
  })

  describe('isAuthenticated', () => {
    it('should test the token is not authenticated', () => {
      const isAuth = service.isAuthenticated()

      expect(isAuth).toBeFalsy()
    })
    it('should test the token is authenticated', () => {
      localStorage.setItem(environment.lsToken, responseMock.token)
      const isAuth = service.isAuthenticated()

      expect(isAuth).toBeTruthy()
    })
  })

  describe('setJwtToken', () => {
    it('should test the token is saved on localStorage', () => {
      service.setJwtToken(responseMock.token)

      expect(localStorage.getItem(environment.lsToken)).toEqual(responseMock.token)
    })
  })

  describe('getJwtToken', () => {
    it('should test on localStorage no have token', () => {
      const token = service.getJwtToken()

      expect(token).toBeFalsy()
    })
    it('should test on localStorage have token', () => {
      service.setJwtToken(responseMock.token)
      const token = service.getJwtToken()

      expect(token).toBeTruthy()
    })
  })

  describe('removeJwtToken', () => {
    it('should test remove token on localStorage', () => {
      service.setJwtToken(responseMock.token)

      expect(localStorage.getItem(environment.lsToken)).toEqual(responseMock.token)

      service.removeJwtToken()

      expect(localStorage.getItem(environment.lsToken)).toBeFalsy()
    })
  })

  describe('getJwtTokenPayloads', () => {
    it('should test remove token on localStorage', () => {
      const payload = service.getJwtTokenPayload(responseMock.token)

      expect(payload).toEqual(payloadMock)
    })
  })

  describe('jwtTokenIsValid', () => {
    it('should test the token is invalid', () => {
      const isValid = service.jwtTokenIsValid()

      expect(isValid).toBeFalsy()
    })
    it('should test the token is valid', () => {
      localStorage.setItem(environment.lsToken, responseMock.token)
      const isValid = service.jwtTokenIsValid()

      expect(isValid).toBeTruthy()
    })
  })
})
