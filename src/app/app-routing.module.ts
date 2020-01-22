import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview.module').then(mod => mod.OverviewModule),
    data: { preload: true }
  }, 
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(mod => mod.UserModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
