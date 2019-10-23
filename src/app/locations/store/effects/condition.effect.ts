import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as locationsActions from "../actions";
import * as fromServices from "../../services";

import { Position } from "../../interfaces/position";

@Injectable()
export class ConditionEffects {
  constructor(private actions$: Actions, private positionService: fromServices.PositionService) {}

  // Load position keys
  @Effect() loadKeys$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadKeys>(locationsActions.ConditionActionTypes.LOAD_KEYS),
    mergeMap((action: locationsActions.LoadKeys) =>
      this.positionService.getPositionKeys(action.payload).pipe(
        map((positions: Position[]) => new locationsActions.LoadKeysSuccess(positions)),
        catchError(err => of(new locationsActions.LoadKeysFail(err)))
      )
    )
  );

  // Load key
  @Effect() loadKey$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadKey>(locationsActions.ConditionActionTypes.LOAD_KEY),
    map((action: locationsActions.LoadKey) => action.payload),
    mergeMap((key: string) =>
      this.positionService.getPositionByKey(key).pipe(
        map((newPosition: Position) => new locationsActions.LoadKeySuccess(newPosition)),
        catchError(err => of(new locationsActions.LoadKeyFail(err)))
      )
    )
  );

  // Load weather
  @Effect()
  loadWeather$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadWeather>(locationsActions.ConditionActionTypes.LOAD_WEATHER),
    map((action: locationsActions.LoadWeather) => action.payload),
    mergeMap((weather: Position) =>
      this.positionService.getWeather(weather).pipe(
        map((position: Position) => new locationsActions.LoadWeatherSuccess({ id: position.id, changes: position })),
        catchError(err => of(new locationsActions.LoadWeatherFail(err)))
      )
    )
  );

  // Load forecast
  @Effect()
  loadForecast$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadForecast>(locationsActions.ConditionActionTypes.LOAD_FORECAST),
    map((action: locationsActions.LoadForecast) => action.payload),
    mergeMap((forecast: Position) =>
      this.positionService.getForecast(forecast).pipe(
        map((position: Position) => new locationsActions.LoadForecastSuccess({ id: position.id, changes: position })),
        catchError(err => of(new locationsActions.LoadForecastFail(err)))
      )
    )
  );
}
