import {createSelector} from '@ngrx/store';
import {getProductsState, ProductsState} from '../reducers';
import {
  getSelectedToppings as getToppings,
  getToppingsEntities as getEntities,
  getToppingsLoaded as getLoaded,
  getToppingsLoading as getLoading
} from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  getProductsState,
  (state: ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(getToppingsState, getEntities);

export const getAllTppings = createSelector(getToppingsEntities, (entities) => Object.values(entities));

export const getToppingsLoaded = createSelector(getToppingsState, getLoaded);

export const getToppingsLoading = createSelector(getToppingsState, getLoading);

export const getSelectedToppings = createSelector(getToppingsState, getToppings);
