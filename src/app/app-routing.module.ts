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

  },
  {
    path        : 'favorites',
    loadChildren: () => import('./features/favorite/favorite.module').then(m => m.FavoriteModule),

 },
  //{
  //  path        : 'auth',
  //  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  //},
  // {
  //   path        : 'error',
  //   loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule)
  // },

  //canActivate : [RouteGuard]
  // {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [              RouterModule.forRoot(routes, {

    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
