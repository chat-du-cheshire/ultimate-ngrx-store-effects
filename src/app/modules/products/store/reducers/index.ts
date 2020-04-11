import {getPizzas, getPizzasLoaded, getPizzasLoading, PizzaState, reducer as pizzasReducer} from './pizzas.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzas = createSelector(getPizzaState, getPizzas);
export const getAllPizzasLoading = createSelector(getPizzaState, getPizzasLoading);
export const getAllPizzasLoaded = createSelector(getPizzaState, getPizzasLoaded);
