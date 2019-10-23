import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as store from "./store";

// Not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
// Routes
import { AppRoutingModule } from "./app-routing.module";
// Modules
import { SharedModule } from "@shared/shared.module";
// Bootstrap
import { AppComponent } from "./app.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { FooterComponent } from "@shared/components/footer/footer.component";
import { PageNotFoundComponent } from "@shared/components/page-not-found/page-not-found.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(store.reducers),
    EffectsModule.forRoot([store.RouterEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{ provide: RouterStateSerializer, useClass: store.CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
