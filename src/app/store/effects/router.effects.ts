import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {BACK, FORWARD, Go, GO} from '../actions';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class RouterEffects {

  @Effect({dispatch: false}) navigate$ = this.actions$.pipe(
    ofType(GO),
    map((action: Go) => action.payload),
    tap(({path, query: queryParams, extras}) => {
      this.router.navigate(path, {queryParams, ...extras});
    })
  );

  @Effect({dispatch: false}) navigateBack$ = this.actions$.pipe(
    ofType(BACK),
    tap(() => this.location.back())
  );

  @Effect({dispatch: false}) navigateForward$ = this.actions$.pipe(
    ofType(FORWARD),
    tap(() => this.location.forward())
  );

  constructor(private actions$: Actions, private router: Router, private location: Location) {
  }
}
