import {Topping} from '../../models/topping.model';
import {LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL, LOAD_TOPPINGS_SUCCESS, ToppingsAction} from '../actions/toppings.action';

export interface ToppingsState {
  entities: { [key: number]: Topping };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: ToppingsAction): ToppingsState {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case LOAD_TOPPINGS_SUCCESS: {
      const entities = action.payload.reduce((acc, topping) => ({
        ...acc,
        [topping.id]: topping
      }), {...state.entities});
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }
  }
  return state;
}

export function getToppingsLoading(state: ToppingsState) {
  return state.loading;
}

export function getToppingsLoaded(state: ToppingsState) {
  return state.loaded;
}

export function getToppingsEntities(state: ToppingsState) {
  return state.entities;
}
