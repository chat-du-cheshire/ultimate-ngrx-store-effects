import {PizzaState, reducer as pizzasReducer} from './pizzas.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer
}
