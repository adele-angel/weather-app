import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import * as fromStore from "../../store";

import { Position } from "../../interfaces/position";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  isLoading: boolean = true;
  isMetric: boolean = true;

  favorites$: Observable<Position[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromStore.LocationsState>, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
    this.isMetric = localStorage.getItem("isMetric") == "true" ? true : false;
    this.store.dispatch(new fromStore.LoadPositions());
    this.favorites$ = this.store.select(fromStore.getFavorites);
    this.error$ = this.store.pipe(select(fromStore.getPositionError));
  }

  displayDetails(id: number) {
    this.store.dispatch(new fromStore.LoadPosition(id));
    this.router.navigate(["/"]);
  }

  createIconURL(icon: number): string {
    return "https://developer.accuweather.com/sites/default/files/" + (icon < 10 ? "0" : "") + icon + "-s.png";
  }

  convertTemperature(temperature: number, positionMetric: boolean) {
    if (this.isMetric && !positionMetric) return ((temperature - 32) / 1.8).toFixed(0);
    else if (!this.isMetric && positionMetric) return (temperature * 1.8 + 32).toFixed(0);
    else return temperature.toFixed(0);
  }
}
