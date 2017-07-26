import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISetting } from '../interfaces/isetting';

@Injectable()
export class SharedService {

  constructor() { }

  getSettings(): ISetting {
    return environment.appSettings;
  }
}
