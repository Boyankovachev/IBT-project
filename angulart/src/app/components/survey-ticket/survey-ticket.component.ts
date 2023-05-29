import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey.service';

@Component({
  selector: 'survey-ticket',
  templateUrl: 'survey-ticket.component.html',
  styleUrls: ['survey-ticket.component.scss'],
})
export class SurveyTicketComponent {
  @Input() survey: Survey;

  constructor(private surveyService: SurveyService, private route: Router) {}

  public onClick() {
    this.surveyService.openedSurveyId = this.survey.id;
    this.route.navigateByUrl('/dashboard/survey');
  }
}
