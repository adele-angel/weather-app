import { Weather } from "./weather";
import { Forecast } from "./forecast";

export interface Position {
  id?: number;
  city?: string;
  country?: string;
  isFavorite?: boolean | false;
  isMetric?: boolean | true;
  weather?: Weather;
  forecast?: Forecast;
}
