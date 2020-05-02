import { MatIconModule } from '@angular/material/icon';
import { UserState } from './store/user.state';
import { MatButtonModule } from '@angular/material/button';
import { AppState } from './store/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, NoopNgxsExecutionStrategy, NGXS_PLUGINS } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { SnackShowErrorModule } from './shared/components/consumables/snack-show-error/snack-show-error.module';
import { SnackShowErrorService } from './shared/components/consumables/snack-show-error/snack-show-error.service';
import { NgxsModuleOptions } from '@ngxs/store';
import { LogRestaurantPluginModule } from './plugins/log-restaurant-selected.plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CreateAccountModalModule } from './shared/components/create-account-modal/create-account-modal.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';


export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: true,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See above for their effects)
    suppressErrors: false,
    injectContainerState: false
  },
  compatibility: {
    strictContentSecurityPolicy: true
  },
  // Execution strategy overridden for illustrative purposes
  // (only do this if you know what you are doing)
  executionStrategy: NoopNgxsExecutionStrategy
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SnackShowErrorModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CreateAccountModalModule,
    MatButtonModule,
    MatIconModule,
    NgxsStoragePluginModule.forRoot(),
    LogRestaurantPluginModule.forRoot({}),
    NgxsFormPluginModule.forRoot(),
    NgxsModule.forRoot([
      AppState,
      UserState
    ], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [
    SnackShowErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
