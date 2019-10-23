import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromLocations from "../index";
import * as fromCondition from "../actions/condition.action";

import { Position } from "../../interfaces/position";
import { Weather } from "../../interfaces/weather";
import { Forecast } from "../../interfaces/forecast";

export interface ConditionState extends EntityState<Position> {
  selectedConditionId: number | null;
  weather: Weather;
  forecast: Forecast;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const defaultCondition: ConditionState = {
  ids: [],
  entities: {},
  selectedConditionId: null,
  weather: {},
  forecast: {},
  loading: false,
  loaded: false,
  error: ""
};

export interface LocationsState extends fromLocations.LocationsState {
  condition: ConditionState;
}
export const conditionAdapter: EntityAdapter<Position> = createEntityAdapter<Position>();
export const initialState = conditionAdapter.getInitialState(defaultCondition);

// Condition reducer
export function conditionReducer(state = initialState, action: fromCondition.ConditionActions): ConditionState {
  switch (action.type) {
    // Load position keys
    case fromCondition.ConditionActionTypes.LOAD_KEYS_SUCCESS:
      return conditionAdapter.addAll(action.payload, { ...state, loading: false, loaded: true });
    case fromCondition.ConditionActionTypes.LOAD_KEYS_FAIL:
      return { ...state, entities: {}, loading: false, loaded: false, error: action.payload };

    // Load position key
    case fromCondition.ConditionActionTypes.LOAD_KEY_SUCCESS:
      return conditionAdapter.addOne(action.payload, { ...state, selectedConditionId: action.payload.id });

    // Load weather & forecast
    case fromCondition.ConditionActionTypes.LOAD_WEATHER_SUCCESS:
    case fromCondition.ConditionActionTypes.LOAD_FORECAST_SUCCESS:
      return conditionAdapter.updateOne(action.payload, state);

    // Failure to load key, weather or forecast of a position
    case fromCondition.ConditionActionTypes.LOAD_KEY_FAIL:
    case fromCondition.ConditionActionTypes.LOAD_WEATHER_FAIL:
    case fromCondition.ConditionActionTypes.LOAD_FORECAST_FAIL:
      return { ...state, loading: false, loaded: false, error: action.payload };

    // No familiar action taken
    default:
      return state;
  }
}
