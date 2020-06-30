import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { OnerecipeComponent } from './recipe/onerecipe/onerecipe.component';
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: "home", component : HomeComponent, canActivate : [AuthGuard]},
  { path: "view-recipe/:id", component : OnerecipeComponent, canActivate : [AuthGuard]},
  { path: "create-recipe", component : CreateRecipeComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
