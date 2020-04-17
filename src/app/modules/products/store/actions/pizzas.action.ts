import {Action} from '@ngrx/store';
import {Pizza} from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
  payload = null;
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: Pizza[]) {
  }
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;

  constructor(public payload: any) {
  }
}

export const CREATE_PIZZA = '[Products] Create Pizzas';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizzas Success';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizzas Fail';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;

  constructor(public payload: Pizza) {
  }
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {
  }
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;

  constructor(public payload: any) {
  }
}

export type PizzasAction = LoadPizzas | LoadPizzasSuccess | LoadPizzasFail
  | CreatePizza | CreatePizzaSuccess | CreatePizzaFail;
