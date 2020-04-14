import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {storeFreeze} from 'ngrx-store-freeze';
import {CustomSerializer, reducers} from './store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
