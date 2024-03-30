import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { AddClothesComponent } from './components/clothes/add-clothes/add-clothes.component';
import { AuthGuard } from './guard/auth.guard';
import { AllClothesComponent } from './components/clothes/all-clothes/all-clothes.component';
import { DetailsClothesComponent } from './components/clothes/details-clothes/details-clothes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'store',
    component: AllClothesComponent
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-item',
    component: AddClothesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'store/:id',
    component: DetailsClothesComponent
  },
  {path: 'error', component: ErrorComponent},
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
