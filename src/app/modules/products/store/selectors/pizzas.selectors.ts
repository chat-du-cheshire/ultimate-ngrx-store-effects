import {createSelector} from '@ngrx/store';
import {getPizzasEntities, getPizzasLoaded, getPizzasLoading} from '../reducers/pizzas.reducer';
import {getProductsState, ProductsState} from '../reducers';
import {getRouterState} from '../../../../store/reducers';
import {Pizza} from '../../models/pizza.model';

export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzasEntities = createSelector(getPizzaState, getPizzasEntities);
export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);
export const getAllPizzas = createSelector(getAllPizzasEntities, (entities) => Object.values(entities));
export const getAllPizzasLoading = createSelector(getPizzaState, getPizzasLoading);
export const getAllPizzasLoaded = createSelector(getPizzaState, getPizzasLoaded);
