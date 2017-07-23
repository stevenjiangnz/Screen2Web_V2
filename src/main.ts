import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ServiceAccessService } from './app/services/service-access.service';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([ServiceAccessService]).bootstrapModule(AppModule);
