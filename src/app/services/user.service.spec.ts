import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Headers, RequestOptions, Response, XHRBackend, ResponseOptions, RequestMethod } from '@angular/http';
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
      service.ensureLogin().then((data) => {
        done();
      });
    })();
  });
});
