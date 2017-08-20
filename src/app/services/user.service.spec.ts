import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Headers, RequestOptions, Response, XHRBackend, ResponseOptions, RequestMethod } from '@angular/http';
import { Token } from '../model/EntityDefinitions';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserService, AuthService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  fit('should be logged in', (done) => {
    inject([UserService], (service: UserService) => {
      service.ensureLogin('', '').then((data) => {
        expect(data).not.toBeNull();
        expect(data.tokeType).toEqual('bearer');
        done();
      });
    })();
  });
  fit('should be logged in if token existing', (done) => {
    inject([UserService], (service: UserService) => {
      UserService.token = new Token();
      UserService.token.tokeType = 'type123';
      service.ensureLogin().then((data) => {
        expect(data).not.toBeNull();
        expect(data.tokeType).toEqual('type123');
        done();
      });
    })();
  });

});
