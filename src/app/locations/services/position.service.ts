import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Position } from "../interfaces/position";

@Injectable({
  providedIn: "root"
})
export class PositionService {
  private apiKey = "gOX0rVGAldlVvWFBckvJ4dVOuWY2zDR0";
  private baseURL = "http://dataservice.accuweather.com";

  private positionAPI = "/locations/v1/cities/";
  private conditionAPI = "/currentconditions/v1/";
  private forecastAPI = "/forecasts/v1/daily/5day/";

  constructor(private http: HttpClient) {}

  // Autocomplete for partial location name
  getPositionKeys(payload: string): Observable<Position[]> {
    let isMetric = localStorage.getItem("isMetric") == "true" ? true : false;
    return this.http
      .get<Position[]>(`${this.baseURL}${this.positionAPI + "autocomplete"}?apikey=${this.apiKey}&q=${payload}`)
      .pipe(
        map((positionKeys: Position[]) =>
          positionKeys.map(position => ({
            id: JSON.parse(position["Key"]),
            city: position["LocalizedName"],
            country: position["Country"]["LocalizedName"],
            isMetric: isMetric
          }))
        )
      );
  }

  getPositionByKey(payload: string): Observable<Position> {
    let isMetric = localStorage.getItem("isMetric") == "true" ? true : false;
    return this.http
      .get<Position>(`${this.baseURL}${this.positionAPI + "autocomplete"}?apikey=${this.apiKey}&q=${payload}`)
      .pipe(
        map((position: Position) => ({
          id: JSON.parse(position[0]["Key"]),
          city: position[0]["LocalizedName"],
          country: position[0]["Country"]["LocalizedName"],
          isMetric: isMetric
        }))
      );
  }

  // Weather condition report
  // Current condition
  getWeather(position: Position): Observable<Position> {
    return this.http.get(`${this.baseURL}${this.conditionAPI}${position.id}?apikey=${this.apiKey}&details=false`).pipe(
      map((weather: Position) => ({
        ...position,
        weather: {
          icon: weather[0].WeatherIcon,
          info: weather[0].WeatherText,
          temperature: position.isMetric ? weather[0].Temperature.Metric.Value : weather[0].Temperature.Imperial.Value
        }
      }))
    );
  }
  // Forecast of the next days
  getForecast(position: Position): Observable<Position> {
    return this.http
      .get(
        `${this.baseURL}${this.forecastAPI}${position.id}?apikey=${this.apiKey}&details=false&metric=${position.isMetric}`
      )
      .pipe(
        map((forecast: Position) => {
          let fiveDaysForecast = forecast["DailyForecasts"].map(forecast => ({
            date: forecast["Date"],
            day: { icon: forecast["Day"]["Icon"], phrase: forecast["Day"]["IconPhrase"] },
            night: { icon: forecast["Night"]["Icon"], phrase: forecast["Night"]["IconPhrase"] },
            temperature: {
              min: forecast["Temperature"]["Minimum"].Value,
              max: forecast["Temperature"]["Maximum"].Value
            }
          }));
          return { ...position, forecast: { info: forecast["Headline"].Text, forecasts: fiveDaysForecast } };
        })
      );
  }

  // Geoposition information according to latitude and longitude
  getGeolocation(lat: number, lon: number) {
    return this.http.get(
      `${this.baseURL}${this.positionAPI + "geoposition/search"}?apikey=${this.apiKey}&q=${lat}%2C${lon}`
    );
  }
}
