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
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be run testPromise', (done) => {
    inject([AuthService], (service: AuthService) => {
      service.testPromise().then((message) => {
        console.log('message in test...', message);
        done();
      });
    })();
  });

  // fit('should be run testPromise', (done) => {
  //   const service = new AuthService(null);
  //   service.testPromise().then((message) => {
  //     console.log('message in test...', message);
  //     done();
  //   });
  // });


  it('should login', inject([AuthService, XHRBackend], async (service: AuthService, mockBackend) => {
    // tslint:disable-next-line:max-line-length
    const returnString = `{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIyYjY1ODQ4Mi02YTM4LTRlZDMtYjM1Ni03N2ZlOWIxNTY5ZjEiLCJ1bmlxdWVfbmFtZSI6InN0ZXZlbmppYW5nbnoiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiIyYTFiM2I4My02NjE5LTRhYTctOTAxOS0xMWM5NWNiYjk5ZjgiLCJyb2xlIjpbIkFkbWluIiwiU3VwZXJBZG1pbiJdLCJpc3MiOiJodHRwOi8vc2NyZWVuMi5qbmV0c29sdXRpb24uY29tLmF1IiwiYXVkIjoiNDE0ZTE5MjdhMzg4NGY2OGFiYzc5ZjcyODM4MzdmZDExMjMiLCJleHAiOjE1MDI3MTY0NDcsIm5iZiI6MTUwMTUwNjg0N30.sCIY9tz1hmiyR8ltbXkESx-4rmJXwJoe5TOryGYjxNA","token_type":"bearer","expires_in":1209599}`;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(new Response(new ResponseOptions({status: 200, body: returnString})));
    });

    await service.login('', '');

    const tokenString = LocalStoreHelper.get(StorageKey.SECURITY_TOKEN);

    // console.log(tokenString);
    // service.login('username', 'password').subscribe(
    //   (result) => {
    //     expect(result).toBeDefined();
    //     // expect(result.status).toBe(200);
    //     // expect(result.json().access_token).toBeDefined();
    //     // expect(result.json().access_token.length).toBeGreaterThan(100);
    //     // expect(result.json().token_type).toEqual('bearer');

    //     const tokenString = LocalStoreHelper.get(StorageKey.SECURITY_TOKEN);

    //     const token = JSON.parse(tokenString) as Token;
    //     expect(tokenString.length).toBeGreaterThan(100);
    //     expect(token.tokeType).toEqual('bearer');
    //   });
  }));

//   fdescribe('long asynchronous specs', function() {
//   let originalTimeout;
//   beforeEach(function() {
//     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//   });

//   it('takes a long time', function(done) {
//     setTimeout(function() {
//       console.log('this is in call back');
//       done();
//     }, 9000);
//   });

//   afterEach(function() {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//   });
// });
});
