import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@core/root/route-guard.service';

export const routes: Routes = [
  {
    path        : '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),

  },
  {
     path        : 'courses',
     loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
     canActivate : [RouteGuard]
  },
  {
    path        : 'favorites',
    loadChildren: () => import('./features/favorite/favorite.module').then(m => m.FavoriteModule),
    canActivate : [RouteGuard]
 },

];

@NgModule({
  imports: [              RouterModule.forRoot(routes, {

    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
