import { Component, Input } from '@angular/core';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey.service';

@Component({
  selector: 'all-surveys',
  templateUrl: 'all-surveys.component.html',
  styleUrls: ['all-surveys.component.scss'],
})
export class AllSurveysComponents {
  @Input() surveys: Survey[];

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.surveysBS.subscribe((data) => {
      this.surveys = data;
    });
  }
}
