import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Nameserver } from '../models';
import { ApiService } from '../services';
import { NameserverActions } from './nameserver.actions';
import { Store } from '@ngrx/store';
import { selectNameservers } from './nameserver.reducer';

@Injectable()
export class NameserverEffects {
  readonly #apiService = inject(ApiService);
  readonly #store = inject(Store);

  loadNameservers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NameserverActions.loadNameservers),
      mergeMap(() => {
        return this.#apiService.getAllNameservers().pipe(
          map((nameservers: Nameserver[]) => {
            return NameserverActions.loadNameserversSuccess({
              nameservers,
            });
          }),
          catchError((error) => {
            return of(NameserverActions.loadNameserversFailure({ error }));
          })
        );
      })
    );
  });

  addNameservers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NameserverActions.addNameserver),
      withLatestFrom(this.#store.select(selectNameservers)),
      mergeMap(([{ nameserver }, nameservers]) => {
        const isUnique = !nameservers.some(
          (existingNS) =>
            existingNS.name === nameserver.name ||
            existingNS.ipAddress === nameserver.ipAddress
        );

        if (isUnique) {
          return this.#apiService.addNameserver(nameserver).pipe(
            map((response: Nameserver) =>
              NameserverActions.addNameserverSuccess({ nameserver: response })
            ),
            catchError((error) =>
              of(NameserverActions.addNameserverFailure({ error }))
            )
          );
        } else {
          return of(
            NameserverActions.addNameserverFailure({
              error: 'Nameserver already exists',
            })
          );
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
