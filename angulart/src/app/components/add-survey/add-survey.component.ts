import { Component, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/core/models/answer.model';
import { Question } from 'src/app/core/models/question.model';
import { Survey } from 'src/app/core/models/survey.model';

@Component({
  selector: 'add-survey',
  templateUrl: 'add-survey.component.html',
  styleUrls: ['add-survey.component.scss'],
})
export class AddSurveyComponent {
  public surveyName: string = '';
  public questions: Question[] = [];

  public createSurvey: EventEmitter<Survey> = new EventEmitter();

  constructor() {}

  okClicked() {
    var survey: Survey = new Survey();
    survey.name = this.surveyName;
    survey.questions = this.questions;
    this.createSurvey.emit(survey);
  }

  addQuestion() {
    var newQuestion: Question = new Question();
    newQuestion.questionText = '';
    newQuestion.answers = [];
    this.questions.push(newQuestion);
  }

  addAnswer(question: Question) {
    var newAnswer: Answer = new Answer();
    newAnswer.answerText = '';
    newAnswer.votes = 0;
    question.answers.push(newAnswer);
  }
}
