import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpService } from '../backend/http.service';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  public surveysBS: BehaviorSubject<Survey[]> = new BehaviorSubject([]);

  public openedSurveyId: number = -1;

  constructor(private api: HttpService) {}

  public getSurveys() {
    firstValueFrom(this.api.getAllSyrveys()).then(
      (data) => {
        this.surveysBS.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
