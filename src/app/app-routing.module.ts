import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { TabsGuard } from './core/guards/tabs.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./private/private-routing.module').then( m => m.PrivateRoutingModule),
    canActivate: [TabsGuard]
  },
  {
    path: '',
    loadChildren: () => import('./public/public-routing.module').then( m => m.PublicRoutingModule),
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
