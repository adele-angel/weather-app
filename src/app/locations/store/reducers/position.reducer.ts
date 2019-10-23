import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromLocations from "../index";
import * as fromPosition from "../actions/position.action";

import { Position } from "../../interfaces/position";

export interface PositionState extends EntityState<Position> {
  selectedPositionId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const defaultCondition: PositionState = {
  ids: [],
  entities: {},
  selectedPositionId: null,
  loading: false,
  loaded: false,
  error: ""
};

export interface LocationsState extends fromLocations.LocationsState {
  position: PositionState;
}
export const positionAdapter: EntityAdapter<Position> = createEntityAdapter<Position>();
export const initialState = positionAdapter.getInitialState(defaultCondition);

// Position reducer
export function positionReducer(state = initialState, action: fromPosition.PositionActions): PositionState {
  switch (action.type) {
    // Load favorites
    case fromPosition.PositionActionTypes.LOAD_POSITIONS_SUCCESS:
      return positionAdapter.addAll(action.payload, { ...state, loading: false, loaded: true });
    case fromPosition.PositionActionTypes.LOAD_POSITIONS_FAIL:
      return { ...state, entities: {}, loading: false, loaded: false, error: action.payload };

    // Load favorite
    case fromPosition.PositionActionTypes.LOAD_POSITION_SUCCESS:
      return positionAdapter.addOne(action.payload, { ...state, selectedPositionId: action.payload.id });

    // Create favorite
    case fromPosition.PositionActionTypes.CREATE_POSITION_SUCCESS:
      return positionAdapter.addOne(action.payload, state);

    // Update favorite
    case fromPosition.PositionActionTypes.UPDATE_POSITION_SUCCESS:
      return positionAdapter.updateOne(action.payload, state);

    // Delete position
    case fromPosition.PositionActionTypes.DELETE_POSITION_SUCCESS:
      return positionAdapter.removeOne(action.payload, state);

    // Failure to create, update or delete a favorite
    case fromPosition.PositionActionTypes.LOAD_POSITION_FAIL:
    case fromPosition.PositionActionTypes.CREATE_POSITION_FAIL:
    case fromPosition.PositionActionTypes.UPDATE_POSITION_FAIL:
    case fromPosition.PositionActionTypes.DELETE_POSITION_FAIL:
      return { ...state, loading: false, loaded: false, error: action.payload };

    // No familiar action taken
    default:
      return state;
  }
}
