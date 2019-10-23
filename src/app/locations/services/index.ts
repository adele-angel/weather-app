import { StorageService } from "./storage.service";
import { PositionService } from "./position.service";

export const locationsServices: any[] = [StorageService, PositionService];

export * from "./storage.service";
export * from "./position.service";
