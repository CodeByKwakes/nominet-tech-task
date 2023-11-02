import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Nameserver } from '../models';

export const NameserverActions = createActionGroup({
  source: 'Nameserver',
  events: {
    'Load Nameservers': emptyProps(),
    'Load Nameservers Success': props<{ nameservers: Nameserver[] }>(),
    'Load Nameservers Failure': props<{ error: string | null }>(),
    'Add Nameserver': props<{ nameserver: Nameserver }>(),
    'Add Nameserver Success': props<{ nameserver: Nameserver }>(),
    'Add Nameserver Failure': props<{ error: string | null }>(),
    'Reset Message': emptyProps()
  }
});
