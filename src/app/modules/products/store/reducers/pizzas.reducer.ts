import {Pizza} from '../../models/pizza.model';
import {LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzasAction} from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: PizzasAction): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_PIZZAS_SUCCESS: {
      const entities = action.payload.reduce(
        (acc: { [id: number]: Pizza }, pizza) => ({...acc, [pizza.id]: pizza}),
        {...state.entities}
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}


export function getPizzasLoading(state: PizzaState) {
  return state.loading;
}

export function getPizzasLoaded(state: PizzaState) {
  return state.loaded;
}

export function getPizzasEntities(state: PizzaState) {
  return state.entities;
}
