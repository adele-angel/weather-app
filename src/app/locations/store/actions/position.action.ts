import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Position } from "../../interfaces/position";

export enum PositionActionTypes {
  LOAD_POSITIONS = "[Locations] Load Positions",
  LOAD_POSITIONS_SUCCESS = "[Locations] Load Positions Success",
  LOAD_POSITIONS_FAIL = "[Locations] Load Positions Fail",

  LOAD_POSITION = "[Locations] Load Position",
  LOAD_POSITION_SUCCESS = "[Locations] Load Position Success",
  LOAD_POSITION_FAIL = "[Locations] Load Position Fail",

  CREATE_POSITION = "[Locations] Create Position",
  CREATE_POSITION_SUCCESS = "[Locations] Create Position Success",
  CREATE_POSITION_FAIL = "[Locations] Create Position Fail",

  UPDATE_POSITION = "[Locations] Update Position",
  UPDATE_POSITION_SUCCESS = "[Locations] Update Position Success",
  UPDATE_POSITION_FAIL = "[Locations] Update Position Fail",

  DELETE_POSITION = "[Locations] Delete Position",
  DELETE_POSITION_SUCCESS = "[Locations] Delete Position Success",
  DELETE_POSITION_FAIL = "[Locations] Delete Position Fail"
}

// Load favorites
export class LoadPositions implements Action {
  readonly type = PositionActionTypes.LOAD_POSITIONS;
}
export class LoadPositionsSuccess implements Action {
  readonly type = PositionActionTypes.LOAD_POSITIONS_SUCCESS;
  constructor(public payload: Position[]) {}
}
export class LoadPositionsFail implements Action {
  readonly type = PositionActionTypes.LOAD_POSITIONS_FAIL;
  constructor(public payload: string) {}
}

// Load favorite
export class LoadPosition implements Action {
  readonly type = PositionActionTypes.LOAD_POSITION;
  constructor(public payload: number) {}
}
export class LoadPositionSuccess implements Action {
  readonly type = PositionActionTypes.LOAD_POSITION_SUCCESS;
  constructor(public payload: Position) {}
}
export class LoadPositionFail implements Action {
  readonly type = PositionActionTypes.LOAD_POSITION_FAIL;
  constructor(public payload: string) {}
}

// Create favorite
export class CreatePosition implements Action {
  readonly type = PositionActionTypes.CREATE_POSITION;
  constructor(public payload: Position) {}
}
export class CreatePositionSuccess implements Action {
  readonly type = PositionActionTypes.CREATE_POSITION_SUCCESS;
  constructor(public payload: Position) {}
}
export class CreatePositionFail implements Action {
  readonly type = PositionActionTypes.CREATE_POSITION_FAIL;
  constructor(public payload: string) {}
}

// Update favorite
export class UpdatePosition implements Action {
  readonly type = PositionActionTypes.UPDATE_POSITION;
  constructor(public payload: Position) {}
}
export class UpdatePositionSuccess implements Action {
  readonly type = PositionActionTypes.UPDATE_POSITION_SUCCESS;
  constructor(public payload: Update<Position>) {}
}
export class UpdatePositionFail implements Action {
  readonly type = PositionActionTypes.UPDATE_POSITION_FAIL;
  constructor(public payload: string) {}
}

// Delete favorite
export class DeletePosition implements Action {
  readonly type = PositionActionTypes.DELETE_POSITION;
  constructor(public payload: number) {}
}
export class DeletePositionSuccess implements Action {
  readonly type = PositionActionTypes.DELETE_POSITION_SUCCESS;
  constructor(public payload: number) {}
}
export class DeletePositionFail implements Action {
  readonly type = PositionActionTypes.DELETE_POSITION_FAIL;
  constructor(public payload: string) {}
}

export type PositionActions =
  | LoadPositions
  | LoadPositionsSuccess
  | LoadPositionsFail
  | LoadPosition
  | LoadPositionSuccess
  | LoadPositionFail
  | CreatePosition
  | CreatePositionSuccess
  | CreatePositionFail
  | UpdatePosition
  | UpdatePositionSuccess
  | UpdatePositionFail
  | DeletePosition
  | DeletePositionSuccess
  | DeletePositionFail;
