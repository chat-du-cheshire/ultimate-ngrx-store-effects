import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CREATE_PIZZA,
  CREATE_PIZZA_SUCCESS,
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  DELETE_PIZZA,
  DELETE_PIZZA_SUCCESS,
  DeletePizza,
  DeletePizzaFail,
  DeletePizzaSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess,
  UPDATE_PIZZA,
  UPDATE_PIZZA_SUCCESS,
  UpdatePizza,
  UpdatePizzaFail,
  UpdatePizzaSuccess
} from '../actions/pizzas.action';
import {catchError, map, pluck, switchMap} from 'rxjs/operators';
import {PizzasService} from '../../services';
import {of} from 'rxjs';
import {Pizza} from '../../models/pizza.model';
import {Go} from '../../../../store/actions';

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

  @Effect() createPizzaSuccess$ = this.actions$.pipe(
    ofType(CREATE_PIZZA_SUCCESS),
    map((action: CreatePizzaSuccess) => action.payload),
    map((pizza) => new Go({
      path: ['/products', pizza.id]
    }))
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

  @Effect() handlePizzaSuccess$ = this.actions$.pipe(
    ofType(UPDATE_PIZZA_SUCCESS, DELETE_PIZZA_SUCCESS),
    map((pizza) => new Go({path: ['/products']}))
  );

  constructor(private actions$: Actions, private pizzasService: PizzasService) {
  }
}
