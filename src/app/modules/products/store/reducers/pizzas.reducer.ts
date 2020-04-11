import {Pizza} from '../../models/pizza.model';
import {LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS, PizzasAction} from '../actions/pizzas.action';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [{
    'name': 'Blazin\' Inferno',
    'toppings': [
      {
        'id': 10,
        'name': 'pepperoni'
      },
      {
        'id': 9,
        'name': 'pepper'
      },
      {
        'id': 3,
        'name': 'basil'
      },
      {
        'id': 4,
        'name': 'chili'
      },
      {
        'id': 7,
        'name': 'olive'
      },
      {
        'id': 2,
        'name': 'bacon'
      }
    ],
    'id': 1
  }],
  loaded: false,
  loading: false
}

export function reducer(state = initialState, action: PizzasAction): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }
    case LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      }
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

export function getPizzas(state: PizzaState) {
  return state.data;
}
