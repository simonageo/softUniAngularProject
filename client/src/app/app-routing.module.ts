import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { AddClothesComponent } from './components/clothes/add-clothes/add-clothes.component';
import { IsAuthGuard } from './guard/is-authenticated.guard';
import { AllClothesComponent } from './components/clothes/all-clothes/all-clothes.component';
import { DetailsClothesComponent } from './components/clothes/details-clothes/details-clothes.component';
import { EditClothingComponent } from './components/clothes/edit-clothing/edit-clothing.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NotAuthGuard } from './guard/not-authenticated.guard';

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
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'add-item',
    component: AddClothesComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: 'store/:id',
    component: DetailsClothesComponent
  },
  {
    path: 'store/:id/edit',
    component: EditClothingComponent
  },
  {
    path: 'store/:id/comments',
    component: CommentsComponent
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
