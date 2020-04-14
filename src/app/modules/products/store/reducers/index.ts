import {PizzaState, reducer as pizzasReducer} from './pizzas.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

