import {Pizza} from '../../models/pizza.model';
import {
  CREATE_PIZZA,
  CREATE_PIZZA_FAIL,
  CREATE_PIZZA_SUCCESS,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction
} from '../actions/pizzas.action';

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
    case CREATE_PIZZA:
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
    case CREATE_PIZZA_SUCCESS: {
      const entities = {
        ...state.entities,
        [action.payload.id]: action.payload
      };

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case CREATE_PIZZA_FAIL:
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
