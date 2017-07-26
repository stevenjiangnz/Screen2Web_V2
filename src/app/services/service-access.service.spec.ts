import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ServiceAccessService } from './service-access.service';
// import { VIMEO_API_URL } from '../config';

describe('VideoService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ServiceAccessService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

describe('getVideos()', () => {
    it('should return an Observable<Array<Video>>',
        inject([ServiceAccessService, XHRBackend], (videoService: ServiceAccessService, mockBackend) => {

        const mockResponse = {
          data: [
            { id: 0, name: 'Video 0' },
            { id: 1, name: 'Video 1' },
            { id: 2, name: 'Video 2' },
            { id: 3, name: 'Video 3' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        videoService.getVideos().subscribe((videos) => {
          expect(videos.length).toBe(4);
          expect(videos[0].name).toEqual('Video 0');
          expect(videos[1].name).toEqual('Video 1');
          expect(videos[2].name).toEqual('Video 2');
          expect(videos[3].name).toEqual('Video 3');
        });
    }));
  });

describe('getText()', () => {
    it('should return text string',
        inject([ServiceAccessService, XHRBackend], (videoService: ServiceAccessService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: 'hello world'
          })));
        });

        videoService.getText().subscribe((data) => {
          expect(data).toBe('hello world');
        });
    }));
  });
});
