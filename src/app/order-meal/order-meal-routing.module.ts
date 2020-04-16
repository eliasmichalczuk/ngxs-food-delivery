import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'view-restaurants', component: ViewRestaurantComponent
  },
  {
    path: '**', redirectTo: 'view-restaurants'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderMealRoutingModule { }
