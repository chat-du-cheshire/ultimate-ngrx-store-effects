import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';
import {Store} from '@ngrx/store';
import {ProductsState} from '../../store/reducers';
import {Observable} from 'rxjs';
import {LoadPizzas} from '../../store/actions/pizzas.action';
import {getAllPizzas} from '../../store/selectors';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <ng-container *ngIf="pizzas$ | async as pizzas">
          <pizza-item
            *ngFor="let pizza of pizzas"
            [pizza]="pizza">
          </pizza-item>
          <div *ngIf="!pizzas.length">
            No pizzas, add one to get started.
          </div>
        </ng-container>

      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.store.select(getAllPizzas);

  constructor(
    private store: Store<ProductsState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadPizzas());
  }
}
