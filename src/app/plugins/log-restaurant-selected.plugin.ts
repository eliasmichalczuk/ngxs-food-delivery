import { NgModule, ModuleWithProviders } from '@angular/core';
import { NGXS_PLUGINS, getActionTypeFromInstance } from '@ngxs/store';
import { NGXS_LOGGER_PLUGIN_OPTIONS } from '@ngxs/logger-plugin';
import { SetRestaurant } from '../order-meal/store/ongoing-order.actions';

export function LogRestaurantSelected(state, action, next) {
  if (getActionTypeFromInstance(action) === SetRestaurant.type) {
    console.log('RESTAURANT SELECTED');
  }
  return next(state, action);
}


@NgModule()
export class LogRestaurantPluginModule {
  static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: LogRestaurantPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useValue: LogRestaurantSelected,
          multi: true
        },
        {
          provide: NGXS_LOGGER_PLUGIN_OPTIONS,
          useValue: config
        }
      ]
    };
  }
}
