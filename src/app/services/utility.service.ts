import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class UtilityService {

  constructor(private _slimLoadingBarService: SlimLoadingBarService) { }

  startProgressBar()
  {
      this._slimLoadingBarService.reset();
      this._slimLoadingBarService.start();
  }

  completeProgressBar()
  {
    this._slimLoadingBarService.complete();
  }

}
