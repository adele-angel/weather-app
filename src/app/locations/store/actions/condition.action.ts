import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Position } from "../../interfaces/position";

export enum ConditionActionTypes {
  LOAD_KEYS = "[Locations] Load Keys",
  LOAD_KEYS_SUCCESS = "[Locations] Load Keys Success",
  LOAD_KEYS_FAIL = "[Locations] Load Keys Fail",

  LOAD_KEY = "[Locations] Load Key",
  LOAD_KEY_SUCCESS = "[Locations] Load Key Success",
  LOAD_KEY_FAIL = "[Locations] Load Key Fail",

  LOAD_WEATHER = "[Locations] Load Weather",
  LOAD_WEATHER_SUCCESS = "[Locations] Load Weather Success",
  LOAD_WEATHER_FAIL = "[Locations] Load Weather Fail",

  LOAD_FORECAST = "[Locations] Load Forecast",
  LOAD_FORECAST_SUCCESS = "[Locations] Load Forecast Success",
  LOAD_FORECAST_FAIL = "[Locations] Load Forecast Fail"
}

// Load position keys
export class LoadKeys implements Action {
  readonly type = ConditionActionTypes.LOAD_KEYS;
  constructor(public payload: string) {}
}
export class LoadKeysSuccess implements Action {
  readonly type = ConditionActionTypes.LOAD_KEYS_SUCCESS;
  constructor(public payload: Position[]) {}
}
export class LoadKeysFail implements Action {
  readonly type = ConditionActionTypes.LOAD_KEYS_FAIL;
  constructor(public payload: string) {}
}

// Load position key
export class LoadKey implements Action {
  readonly type = ConditionActionTypes.LOAD_KEY;
  constructor(public payload: string) {}
}
export class LoadKeySuccess implements Action {
  readonly type = ConditionActionTypes.LOAD_KEY_SUCCESS;
  constructor(public payload: Position) {}
}
export class LoadKeyFail implements Action {
  readonly type = ConditionActionTypes.LOAD_KEY_FAIL;
  constructor(public payload: string) {}
}

// Load weather
export class LoadWeather implements Action {
  readonly type = ConditionActionTypes.LOAD_WEATHER;
  constructor(public payload: Position) {}
}
export class LoadWeatherSuccess implements Action {
  readonly type = ConditionActionTypes.LOAD_WEATHER_SUCCESS;
  constructor(public payload: Update<Position>) {}
}
export class LoadWeatherFail implements Action {
  readonly type = ConditionActionTypes.LOAD_WEATHER_FAIL;
  constructor(public payload: string) {}
}

// Load forecast
export class LoadForecast implements Action {
  readonly type = ConditionActionTypes.LOAD_FORECAST;
  constructor(public payload: Position) {}
}
export class LoadForecastSuccess implements Action {
  readonly type = ConditionActionTypes.LOAD_FORECAST_SUCCESS;
  constructor(public payload: Update<Position>) {}
}
export class LoadForecastFail implements Action {
  readonly type = ConditionActionTypes.LOAD_FORECAST_FAIL;
  constructor(public payload: string) {}
}

export type ConditionActions =
  | LoadKeys
  | LoadKeysSuccess
  | LoadKeysFail
  | LoadKey
  | LoadKeySuccess
  | LoadKeyFail
  | LoadWeather
  | LoadWeatherSuccess
  | LoadWeatherFail
  | LoadForecast
  | LoadForecastSuccess
  | LoadForecastFail;
