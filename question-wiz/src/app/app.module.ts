import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling'
import { QuizFormComponent } from './quiz/quiz-form/quiz-form.component';
import { QuizResultComponent } from './quiz/quiz-result/quiz-result.component';

import{JwtModule} from '@auth0/angular-jwt'

import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';

import {RadioButtonModule} from 'primeng/radiobutton';
import {ListboxModule} from 'primeng/listbox';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {KnobModule} from 'primeng/knob';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';


import { BoardTableComponent } from './leader-board/board-table/board-table.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth-guard/AuthGuard';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

export function tokenGetter(){
  return localStorage.getItem("jwt")
}


const appRoutes: Routes= [
  {path: 'homepage', component:HomePageComponent,
   canActivate:[AuthGuard]},
  {path:'quiz-form/:id', component:QuizFormComponent,
  canActivate:[AuthGuard]},
  {path:'quiz-result', component:QuizResultComponent,
  canActivate:[AuthGuard]},
  {path:'board-table', component:BoardTableComponent,
  canActivate:[AuthGuard]},
  {path:'register',component: RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'reset-password', component:ResetPasswordComponent},
  {path: '**', component:HomePageComponent,
  canActivate:[AuthGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    QuizFormComponent,
    QuizResultComponent,
    BoardTableComponent,
    RegistrationComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RadioButtonModule,
    ListboxModule,
    ButtonModule,
    PaginatorModule,
    ScrollingModule,
    RippleModule,
    BadgeModule,
    ProgressSpinnerModule,
    KnobModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:5001"],
        disallowedRoutes:[]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
