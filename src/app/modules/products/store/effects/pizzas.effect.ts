import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CREATE_PIZZA,
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  DELETE_PIZZA,
  DeletePizza,
  DeletePizzaFail,
  DeletePizzaSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess,
  UPDATE_PIZZA,
  UpdatePizza,
  UpdatePizzaFail,
  UpdatePizzaSuccess
} from '../actions/pizzas.action';
import {catchError, map, pluck, switchMap} from 'rxjs/operators';
import {PizzasService} from '../../services';
import {of} from 'rxjs';
import {Pizza} from '../../models/pizza.model';

@Injectable()
export class PizzasEffects {

  @Effect() loadPizzas$ = this.actions$.pipe(
    ofType(LOAD_PIZZAS),
    switchMap(() => this.pizzasService.getPizzas()
      .pipe(
        map((pizzas) => new LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new LoadPizzasFail(error)))
      )
    )
  );

  @Effect() createPizza$ = this.actions$.pipe(
    ofType(CREATE_PIZZA),
    pluck<CreatePizza, 'payload'>('payload'),
    switchMap((pizza: Pizza) => this.pizzasService.createPizza(pizza)
      .pipe(
        map((pizza) => new CreatePizzaSuccess(pizza)),
        catchError((error) => of(new CreatePizzaFail(error)))
      )
    )
  );

  @Effect() updatePizza$ = this.actions$.pipe(
    ofType(UPDATE_PIZZA),
    pluck<UpdatePizza, 'payload'>('payload'),
    switchMap((pizza: Pizza) => this.pizzasService.updatePizza(pizza)
      .pipe(
        map((pizza) => new UpdatePizzaSuccess(pizza)),
        catchError((error) => of(new UpdatePizzaFail(error)))
      )
    )
  );

  @Effect() deletePizza$ = this.actions$.pipe(
    ofType(DELETE_PIZZA),
    pluck<DeletePizza, 'payload'>('payload'),
    switchMap((pizza: Pizza) => this.pizzasService.removePizza(pizza)
      .pipe(
        map(() => new DeletePizzaSuccess(pizza)),
        catchError((error) => of(new DeletePizzaFail(error)))
      )
    )
  );

  constructor(private actions$: Actions, private pizzasService: PizzasService) {
  }
}
