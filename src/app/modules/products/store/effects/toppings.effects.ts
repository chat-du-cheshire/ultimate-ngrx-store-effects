import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ToppingsService} from '../../services';
import {LOAD_TOPPINGS, LoadToppingsFail, LoadToppingsSuccess} from '../actions/toppings.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ToppingsEffects {
  @Effect()
  loadToppings$ = this.actions$.pipe(
    ofType(LOAD_TOPPINGS),
    switchMap(() => this.toppingsService.getToppings()
      .pipe(
        map((toppings) => new LoadToppingsSuccess(toppings)),
        catchError((error) => of(new LoadToppingsFail(error)))
      )
    )
  );

  constructor(private actions$: Actions, private toppingsService: ToppingsService) {
  }
}
