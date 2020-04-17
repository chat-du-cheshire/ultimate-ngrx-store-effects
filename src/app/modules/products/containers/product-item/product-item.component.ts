import {Component, OnInit} from '@angular/core';

import {Pizza} from '../../models/pizza.model';

import {Topping} from '../../models/topping.model';
import {Store} from '@ngrx/store';
import {ProductsState} from '../../store/reducers';
import {Observable} from 'rxjs';
import {getPizzaVisualized, getSelectedPizza} from '../../store/selectors';
import {VisualizeToppings} from '../../store/actions/toppings.action';
import {getAllTppings} from '../../store/selectors/toppings.selectors';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza> = this.store.select(getSelectedPizza).pipe(
    tap((pizza = null) => {
      const toppingsExists = !!(pizza && pizza.toppings);
      const toppings = toppingsExists ? pizza.toppings.map(topping => topping.id) : [];
      this.store.dispatch(new VisualizeToppings(toppings));
    })
  );
  visualise$: Observable<Pizza> = this.store.select(getPizzaVisualized);
  toppings$: Observable<Topping[]> = this.store.select(getAllTppings);

  constructor(
    private store: Store<ProductsState>
  ) {
  }

  ngOnInit() {

  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
  }

  onUpdate(event: Pizza) {
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
