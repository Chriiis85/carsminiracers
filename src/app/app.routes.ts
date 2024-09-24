import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SigninPageComponent } from './accounts/signin-page/signin-page.component';



export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign', component: SigninPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
