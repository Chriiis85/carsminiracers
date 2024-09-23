import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './accounts/login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';



export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
