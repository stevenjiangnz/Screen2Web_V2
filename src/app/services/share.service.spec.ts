import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ShareService } from './share.service';
import '../model/EntityDefinitions';

describe('ShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShareService,
       { provide: XHRBackend, useClass: MockBackend },]
    });
  });

  it('should be created', inject([ShareService], (service: ShareService) => {
    expect(service).toBeTruthy();
  }));
});
