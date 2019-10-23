import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as locationsActions from "../actions";
import * as fromServices from "../../services";

import { Position } from "../../interfaces/position";

@Injectable()
export class PositionEffects {
  constructor(private actions$: Actions, private storageService: fromServices.StorageService) {}

  // Load positions
  @Effect() loadFavorites$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadPositions>(locationsActions.PositionActionTypes.LOAD_POSITIONS),
    mergeMap((actions: locationsActions.LoadPositions) =>
      this.storageService.getFavorites().pipe(
        map((positions: Position[]) => new locationsActions.LoadPositionsSuccess(positions)),
        catchError(err => of(new locationsActions.LoadPositionsFail(err)))
      )
    )
  );

  // Load position
  @Effect() loadFavorite$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.LoadPosition>(locationsActions.PositionActionTypes.LOAD_POSITION),
    mergeMap((action: locationsActions.LoadPosition) =>
      this.storageService.getFavoriteById(action.payload).pipe(
        map((position: Position) => new locationsActions.LoadPositionSuccess(position)),
        catchError(err => of(new locationsActions.LoadPositionFail(err)))
      )
    )
  );

  // Create position
  @Effect() createFavorite$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.CreatePosition>(locationsActions.PositionActionTypes.CREATE_POSITION),
    map((action: locationsActions.CreatePosition) => action.payload),
    mergeMap((position: Position) =>
      this.storageService.createFavorite(position).pipe(
        map((newPosition: Position) => new locationsActions.CreatePositionSuccess(newPosition)),
        catchError(err => of(new locationsActions.CreatePositionFail(err)))
      )
    )
  );

  // Update position
  @Effect() updateFavorite$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.UpdatePosition>(locationsActions.PositionActionTypes.UPDATE_POSITION),
    map((action: locationsActions.UpdatePosition) => action.payload),
    mergeMap((position: Position) =>
      this.storageService.updateFavorite(position).pipe(
        map(
          (updatedPosition: Position) =>
            new locationsActions.UpdatePositionSuccess({ id: updatedPosition.id, changes: updatedPosition })
        ),
        catchError(err => of(new locationsActions.UpdatePositionFail(err)))
      )
    )
  );

  // Delete position
  @Effect() deleteFavorite$: Observable<Action> = this.actions$.pipe(
    ofType<locationsActions.DeletePosition>(locationsActions.PositionActionTypes.DELETE_POSITION),
    map((action: locationsActions.DeletePosition) => action.payload),
    mergeMap((id: number) =>
      this.storageService.deleteFavorite(id).pipe(
        map(() => new locationsActions.DeletePositionSuccess(id)),
        catchError(err => of(new locationsActions.DeletePositionFail(err)))
      )
    )
  );
}
