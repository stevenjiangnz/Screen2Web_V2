import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Headers, RequestOptions, Response, XHRBackend, ResponseOptions, RequestMethod } from '@angular/http';
import { AuthService } from './auth.service';
import { MockBackend } from '@angular/http/testing';
import { StorageKey } from '../global/enums';
import { LocalStoreHelper } from '../utils/local-store-helper';
import { Token } from '../model/EntityDefinitions';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be run testPromise', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.testPromise().then((message) => {
        done();
      });
    })();
  });

  it('should login 2', (done) => {
    inject([AuthService], async (service: AuthService) => {
      let token: Token;
      await service.login('', '').then((data) => {
        token = data;
        done();
      });
      expect(token).not.toBeNull();
      expect(token.tokeType).toEqual('bearer');
    })();
  });

  it('should login promise', (done) => {
    inject([AuthService], async (service: AuthService) => {
      let resultString: string;
      await service.loginPromise('', '').then((result) => {
        resultString = result;
        done();
      });
      expect(resultString).toEqual('resData.toString()');
    })();
  });
});
