import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NameserverEffects } from './nameserver.effects';

describe('NameserverEffects', () => {
  let actions$: Observable<any>;
  let effects: NameserverEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NameserverEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NameserverEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
