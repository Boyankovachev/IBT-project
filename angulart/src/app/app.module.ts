import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { SurveyTicketComponent } from './components/survey-ticket/survey-ticket.component';
import { AllSurveysComponents } from './components/all-surveys/all-surveys.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';

const components = [
  DashboardComponent,
  SurveyTicketComponent,
  AllSurveysComponents,
  SurveyOverviewComponent,
  AddSurveyComponent,
];

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
