import { createFeature, createReducer, on } from '@ngrx/store';
import { NameserverActions } from './nameserver.actions';
import { Nameserver } from '../models';

export const nameserverFeatureKey = 'nameserver';

export interface State {
  nameservers: Nameserver[];
  loading: boolean;
  successMsg: string;
  error: string | null;
}

export const initialState: State = {
  nameservers: [],
  loading: false,
  successMsg: '',
  error: null
};

export const reducer = createReducer(
  initialState,
  on(NameserverActions.loadNameservers, (state) => ({
    ...state,
    loading: true
  })),
  on(NameserverActions.loadNameserversSuccess, (state, { nameservers }) => ({
    ...state,
    nameservers
  })),
  on(NameserverActions.loadNameserversFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(NameserverActions.addNameserver, (state) => ({
    ...state,
    loading: true
  })),
  on(NameserverActions.addNameserverSuccess, (state, { nameserver }) => ({
    ...state,
    nameservers: [...state.nameservers, nameserver],
    loading: false,
    successMsg: 'Nameserver added successfully',
    error: null
  })),
  on(NameserverActions.addNameserverFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successMsg: '',
    error
  })),
  on(NameserverActions.resetMessage, (state) => ({
    ...state,
    successMsg: '',
    error: null
  }))
);

export const nameserverFeature = createFeature({
  name: nameserverFeatureKey,
  reducer
});

export const { selectNameservers, selectSuccessMsg, selectError } =
  nameserverFeature;
