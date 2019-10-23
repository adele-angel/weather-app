import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import { ErrorModalComponent } from "./components/error-modal/error-modal.component";
import { PreloaderComponent } from "./components/preloader/preloader.component";

const sharedComponents = [ErrorModalComponent, PreloaderComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule],
  exports: [...sharedComponents]
})
export class SharedModule {}
