import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  private getUrl(): string {
    return environment.apiUrl + 'ibt/';
  }

  public getAllSyrveys(): Observable<any> {
    const req = this.http.get(this.getUrl() + 'all/', {
      headers: this.headers,
    });

    return req;
  }

  public getSyrvey(surveyId: number): Observable<any> {
    var params = new HttpParams();
    params = params.append('id', surveyId);
    const req = this.http.get(this.getUrl() + 'survey/', {
      params: params,
      headers: this.headers,
    });

    return req;
  }

  public castVote(answerId: number): Observable<any> {
    var params = new HttpParams();
    params = params.append('id', answerId);
    const req = this.http.get(this.getUrl() + 'vote/', {
      params: params,
      headers: this.headers,
    });

    return req;
  }

  public createSurvey(survey: Survey): Observable<any> {
    const req = this.http.post(this.getUrl() + 'survey/', survey, {
      headers: this.headers,
    });

    return req;
  }
}
