import { Component, OnInit } from "@angular/core";

import { PositionService } from "../../../services";

@Component({
  selector: "app-geolocation",
  templateUrl: "./geolocation.component.html",
  styleUrls: ["./geolocation.component.css"]
})
export class GeolocationComponent implements OnInit {
  geolocation = null;

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.positionService
        .getGeolocation(position.coords.latitude, position.coords.longitude)
        .subscribe(geolocation => (this.geolocation = geolocation));
    });
  }
}
