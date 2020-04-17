import {PizzaState, reducer as pizzasReducer} from './pizzas.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {reducer as toppingsReducer, ToppingsState} from './toppings.reducer';

export interface ProductsState {
  pizzas: PizzaState,
  toppings: ToppingsState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer,
  toppings: toppingsReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

