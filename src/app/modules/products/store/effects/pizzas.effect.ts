import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LOAD_PIZZAS, LoadPizzasFail, LoadPizzasSuccess} from '../actions/pizzas.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PizzasService} from '../../services';
import {of} from 'rxjs';

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

  constructor(private actions$: Actions, private pizzasService: PizzasService) {
  }
}
