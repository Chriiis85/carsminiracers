import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { authGuard, publicGuard } from './auth.guard';


//Rutas de manera tradicional
/*export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'sign', component: SignPageComponent },
  { path: 'reset', component: ResetPasswordPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto si no hay ruta
];*/

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent),
  },
  {
    path: 'main',
    loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent),
  },  
  {
    path: 'collection',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/collection-page/collection-page.component').then(m => m.CollectionPageComponent),
  },
  {
    path: '',
    canActivate: [publicGuard],
    children:[
      {
        path: 'login',
        loadComponent: () => import('./accounts/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'sign',
        loadComponent: () => import('./accounts/signin-page/signin-page.component').then(m => m.SigninPageComponent)
      },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
