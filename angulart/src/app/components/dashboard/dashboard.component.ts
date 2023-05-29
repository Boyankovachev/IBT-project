import { Component } from '@angular/core';
import { HttpService } from 'src/app/core/backend/http.service';
import { environment } from 'src/environments/environment';
import { from, Observable, firstValueFrom } from 'rxjs';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddSurveyComponent } from '../add-survey/add-survey.component';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private surveyService: SurveyService,
    private route: Router,
    public dialog: MatDialog,
    private api: HttpService
  ) {
    this.surveyService.getSurveys();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  public navigateToList() {
    this.surveyService.openedSurveyId = -1;
    this.route.navigateByUrl('/dashboard/all-surveys');
  }

  public add() {
    const dialogRef = this.dialog.open(AddSurveyComponent, {
      width: '75vw',
      height: '90vh',
    });
    dialogRef.componentInstance.createSurvey.subscribe((survey: Survey) => {
      const req = this.api.createSurvey(survey);
      firstValueFrom(req).then(
        (data) => {
          this.surveyService.getSurveys();
          dialogRef.close();
          this.navigateToList();
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
}
