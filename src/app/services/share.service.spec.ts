import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Headers, RequestOptions, Response, XHRBackend, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ShareService } from './share.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import '../model/EntityDefinitions';

describe('ShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ShareService,
        AuthService,
        UserService
        ]
    });
  });

  // fit('should be created', inject([ShareService], (service: ShareService) => {
  //   const result = service.getShareList();

  //   console.log(result);
  //   expect(result).toBeTruthy();
  // }));


  it('should return ShareList', (done) => {
    inject([ShareService], async (service: ShareService) => {
      await service.getShareList().then((data) => {
        done();
      });
    })();
  });
});
