import { TestBed, inject } from '@angular/core/testing';

import { ServiceAccessService } from './service-access.service';

describe('ServiceAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAccessService]
    });
  });

  it('should be created', inject([ServiceAccessService], (service: ServiceAccessService) => {
    expect(service).toBeTruthy();
  }));
});
