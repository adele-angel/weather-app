import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { locationsReducers, locationsEffects } from "./store";

// Routes
import { LocationsRoutingModule, routingComponents } from "./locations-routing.module";
// Services
import { locationsServices } from "./services";
// Modules
import { SharedModule } from "../shared/shared.module";
// Components
import * as components from "./components";

@NgModule({
  declarations: [...components.locationsComponents, ...routingComponents],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    LocationsRoutingModule,
    StoreModule.forFeature("locations", locationsReducers),
    EffectsModule.forFeature(locationsEffects)
  ],
  providers: [...locationsServices],
  exports: [...components.locationsComponents, ...routingComponents]
})
export class LocationsModule {}
