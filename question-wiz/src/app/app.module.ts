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

const appRoutes: Routes= [
  {path: 'homepage', component:HomePageComponent},
  {path:'quiz-form/:id', component:QuizFormComponent},
  {path:'quiz-result', component:QuizResultComponent},
  {path:'board-table', component:BoardTableComponent},
  {path: '**', component:HomePageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    QuizFormComponent,
    QuizResultComponent,
    BoardTableComponent
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
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
