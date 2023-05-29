import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/backend/http.service';
import { Survey } from 'src/app/core/models/survey.model';
import { SurveyService } from 'src/app/core/services/survey.service';
import { firstValueFrom } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/core/models/answer.model';
@Component({
  selector: 'survey-overview',
  templateUrl: 'survey-overview.component.html',
  styleUrls: ['survey-overview.component.scss'],
})
export class SurveyOverviewComponent {
  public survey: Survey;
  public form: FormGroup;

  public question: FormControl = new FormControl();

  public hasVoted: boolean = false;
  public hasClickedShowResults: boolean = false;

  constructor(
    private surveyService: SurveyService,
    private route: Router,
    private api: HttpService
  ) {
    if (this.surveyService.openedSurveyId == -1) {
      this.route.navigateByUrl('/dashboard/all-surveys');
    }
    this.form = new FormGroup({});
  }

  ngOnInit() {
    firstValueFrom(this.api.getSyrvey(this.surveyService.openedSurveyId)).then(
      (data) => {
        this.survey = data;
        for (var i = 0; i < this.survey.questions.length; i++) {
          const newControl = new FormControl<Answer>(null, [
            Validators.required,
          ]);
          this.form.addControl('question' + i, newControl);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public async castVotesClicked() {
    for (const controlName in this.form.controls) {
      const control = this.form.get(controlName);
      const answer: Answer = control.value;
      const voteRequest = this.api.castVote(answer.answerId);
      await firstValueFrom(voteRequest).then(
        (data) => {
          this.incrementAnswerVote(answer);
        },
        (error) => {
          console.error(error);
        }
      );
      this.hasVoted = true;
    }
  }

  private incrementAnswerVote(input: Answer) {
    for (let question of this.survey.questions) {
      for (let answer of question.answers) {
        if (
          input.answerId == answer.answerId &&
          input.questionId == question.questionId
        ) {
          answer.votes = answer.votes + 1;
        }
      }
    }
  }

  protected showResultsClicked() {
    this.hasClickedShowResults = true;
  }
}
