import { Position } from "../../locations/interfaces/position";

export function entityRestructure(payload: any, state: any): any {
  const entities = payload.reduce(
    (entities: { [id: number]: Position }, position: Position) => ({ ...entities, [position.id]: position }),
    { ...state.entities }
  );
  return entities;
}

export function entityAddUpdate(payload: any, state: any): any {
  return { ...state.entities, [payload.id]: payload };
}

export function entityRemove(payload: any, state: any): any {
  const entities = state.entities.splice(payload.id, 1);
  return entities;
}
