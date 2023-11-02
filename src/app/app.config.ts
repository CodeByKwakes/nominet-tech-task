import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { nameserverFeature, NameserverEffects } from './+state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideState(nameserverFeature),
    provideEffects(NameserverEffects),
    provideStoreDevtools({
      name: 'nominet-tech-task',
    }),
  ],
};
