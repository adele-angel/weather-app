import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPosition from "./position.reducer";
import * as fromCondition from "./condition.reducer";

export interface LocationsState {
  position: fromPosition.PositionState;
  condition: fromCondition.ConditionState;
}

export const locationsReducers: ActionReducerMap<LocationsState> = {
  position: fromPosition.positionReducer,
  condition: fromCondition.conditionReducer
};

export const getLocationsState = createFeatureSelector<LocationsState>("locations");
