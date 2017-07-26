import { TestBed, inject } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));

  it('should get settings', inject([SharedService], (service: SharedService) => {
    const setting = service.getSettings();
    const baseUrl = setting.apiBaseUrl;
    expect(setting.apiBaseUrl.length).toBeGreaterThan(1);
    expect(baseUrl.indexOf('http')).toBeGreaterThanOrEqual(0);
  }));

});
