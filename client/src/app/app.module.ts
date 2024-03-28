import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { authenticatedInterceptorProvider } from './user/authenticated.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { ClothesItemComponent } from './components/clothes/clothes-item/clothes-item.component';
import { AddClothesComponent } from './components/clothes/add-clothes/add-clothes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    ClothesItemComponent,
    AddClothesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authenticatedInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
