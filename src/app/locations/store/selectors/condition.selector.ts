import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import { conditionAdapter, ConditionState, LocationsState } from "../reducers/condition.reducer";

export const getConditionState = createSelector(
  fromFeature.getLocationsState,
  (state: LocationsState) => state.condition
);

export const getKeys = createSelector(
  getConditionState,
  conditionAdapter.getSelectors().selectAll
);
export const getConditionId = createSelector(
  getConditionState,
  (state: ConditionState) => state.selectedConditionId
);
export const getCondition = createSelector(
  getConditionState,
  getConditionId,
  state => state.entities[state.selectedConditionId]
);
export const getDefaultCondition = createSelector(
  getConditionState,
  getKeys,
  getConditionId,
  (state: ConditionState) => state.entities[215854]
);

export const getConditionsLoading = createSelector(
  getConditionState,
  (state: ConditionState) => state.loading
);
export const getConditionsLoaded = createSelector(
  getConditionState,
  (state: ConditionState) => state.loaded
);
export const getConditionError = createSelector(
  getConditionState,
  (state: ConditionState) => state.error
);
