import { homeComponents } from "./home";
import { favoritesComponents } from "./favorites";

export const locationsComponents: any[] = [...homeComponents, ...favoritesComponents];

export * from "./home";
export * from "./favorites";
