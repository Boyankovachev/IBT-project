import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSurveysComponents } from './components/all-surveys/all-surveys.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'all-surveys',
        component: AllSurveysComponents,
      },
      {
        path: 'survey',
        component: SurveyOverviewComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard/all-surveys',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
