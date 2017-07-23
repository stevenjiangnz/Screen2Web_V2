import { Injectable } from '@angular/core';

@Injectable()
export class ServiceAccessService {

  constructor() { }

  getTestString() {
    return 'test string';
  }

}
