import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SharedService {

  constructor() { }

  getSettings() {
    return environment.appSettings;
  }
}
