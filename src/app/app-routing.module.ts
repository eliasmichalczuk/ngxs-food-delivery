import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'order-meal', loadChildren: () => import('./order-meal/order-meal.module').then(m => m.OrderMealModule)
  },
  {
    path: 'hello', loadChildren: () => import('./hello/hello.module').then(m => m.HelloModule)
  },
  {
    path: '**', redirectTo: 'hello'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
