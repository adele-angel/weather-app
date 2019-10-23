import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";

import * as RouterActions from "./router.action";

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private location: Location) {}

  @Effect({ dispatch: false }) navigate$: Observable<Action> = this.actions$.pipe(
    ofType<RouterActions.Go>(RouterActions.RouterActionTypes.GO),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras })),
    catchError(err => of(err))
  );

  @Effect({ dispatch: false }) navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType<RouterActions.Back>(RouterActions.RouterActionTypes.BACK),
    tap(() => this.location.back()),
    catchError(err => of(err))
  );

  @Effect({ dispatch: false }) navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType<RouterActions.Forward>(RouterActions.RouterActionTypes.FORWARD),
    tap(() => this.location.forward()),
    catchError(err => of(err))
  );
}
