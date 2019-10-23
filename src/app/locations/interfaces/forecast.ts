export interface Forecast {
  info?: string;
  forecasts?: ForecastItem[];
}

export interface ForecastItem {
  date?: string;
  day?: {
    icon?: number;
    phrase?: string;
  };
  night?: {
    icon?: number;
    phrase?: string;
  };
  temperature?: {
    min?: number;
    max?: number;
  };
}
