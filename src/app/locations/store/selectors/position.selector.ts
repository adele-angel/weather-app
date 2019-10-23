import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import { positionAdapter, PositionState, LocationsState } from "../reducers/position.reducer";

export const getPositionState = createSelector(
  fromFeature.getLocationsState,
  (state: LocationsState) => state.position
);

export const getFavorites = createSelector(
  getPositionState,
  positionAdapter.getSelectors().selectAll
);
export const getFavoriteId = createSelector(
  getPositionState,
  (state: PositionState) => state.selectedPositionId
);
export const getFavorite = createSelector(
  getPositionState,
  getFavoriteId,
  state => state.entities[state.selectedPositionId]
);

export const getFavoritesLoading = createSelector(
  getPositionState,
  (state: PositionState) => state.loading
);
export const getFavoritesLoaded = createSelector(
  getPositionState,
  (state: PositionState) => state.loaded
);
export const getPositionError = createSelector(
  getPositionState,
  (state: PositionState) => state.error
);
