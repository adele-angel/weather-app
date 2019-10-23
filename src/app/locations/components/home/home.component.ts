import { Component, OnInit, AfterViewInit } from "@angular/core";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import * as fromStore from "../../store";

import { Position } from "../../interfaces/position";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  isMetric: boolean = this.getUnits() === "false" ? false : true;
  isUnitsChanged: boolean = false;
  isSelectOpen: boolean = false;

  positions$: Observable<Position[]>;
  position$: Observable<Position>;
  position: Position;
  error$: Observable<String>;

  constructor(private store: Store<fromStore.LocationsState>) {
    this.setUnits();
  }

  ngOnInit() {
    this.isLoading = false;
    this.getLocation({ id: 215854, city: "Tel Aviv", country: "Israel", isFavorite: false, isMetric: this.isMetric });
    this.error$ = this.store.pipe(select(fromStore.getConditionError));
  }

  ngAfterViewInit(): void {
    this.store.select(fromStore.getFavorite).subscribe(position => (this.position = position));
  }

  searchLocation(city: string) {
    this.store.dispatch(new fromStore.LoadKeys(city));
    this.positions$ = this.store.select(fromStore.getKeys);
    if (this.positions$ && this.positions$ !== undefined) this.isSelectOpen = true;
  }

  getLocation(position: Position) {
    this.isSelectOpen = false;
    this.store.dispatch(new fromStore.LoadKey(position.city));
    this.store.dispatch(new fromStore.LoadWeather(position));
    this.store.dispatch(new fromStore.LoadForecast(position));
    this.position$ = this.store.select(fromStore.getCondition);
    this.position$.subscribe(position => (this.position = position));
  }

  addFavorite(position: Position) {
    this.position.isFavorite = true;
    this.store.dispatch(new fromStore.CreatePosition(position));
  }

  deleteFavorite(position: Position) {
    this.store.dispatch(new fromStore.DeletePosition(position.id));
    this.position.isFavorite = false;
  }

  getDefaultCity(position) {
    this.store.dispatch(new fromStore.LoadKey(position.city));
    this.store.dispatch(new fromStore.LoadWeather(position));
    this.store.dispatch(new fromStore.LoadForecast(position));
    this.store.select(fromStore.getCondition).subscribe(defaultLocation => (this.position = defaultLocation));
  }

  setUnits() {
    localStorage.setItem("isMetric", JSON.stringify(this.isMetric));
  }
  getUnits() {
    return localStorage.getItem("isMetric");
  }
  convertTemperature(temperature: number, positionMetric: boolean) {
    if (this.isMetric && !positionMetric) return ((temperature - 32) / 1.8).toFixed(0);
    else if (!this.isMetric && positionMetric) return (temperature * 1.8 + 32).toFixed(0);
    else return temperature.toFixed(0);
  }

  createIconURL(icon: number): string {
    return "https://developer.accuweather.com/sites/default/files/" + (icon < 10 ? "0" : "") + icon + "-s.png";
  }
}
