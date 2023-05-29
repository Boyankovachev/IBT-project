package com.example.demo;

import com.example.demo.models.Answer;
import com.example.demo.models.Question;
import com.example.demo.models.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyService {

    @Autowired Database database;
    public MyService(){}

    public ArrayList<Survey> getAllSurveys(){
        return this.database.getAllSurveys();
    }

    public int createSurvey(Survey survey){
        int newSurveyId = this.database.createSurvey(survey);
        int result = -1;
        if(newSurveyId != -1) {
            // Survey row inserted successfully
            for(Question question : survey.questions){
                question.surveyId = newSurveyId;
                result = newSurveyId;
                int newQuestionId = this.database.createQuestion(question);
                if(newQuestionId != -1){
                    // Question added successfully
                    for(Answer answer : question.answers){
                        answer.questionId = newQuestionId;
                        int newAnswerId = this.database.createAnswer(answer);
                        if(newAnswerId == -1){
                            result = -1;
                            break;
                        }
                    }
                }
                else {
                    result = -1;
                    break;
                }
            }
        }
        return result;
    }

    public Survey getWholeSurvey(int surveyId){
        Survey survey = this.database.getSurveyRowById(surveyId);
        if(survey == null){
            return null;
        }
        survey.questions = new ArrayList<>();

        ArrayList<Question> questions = this.database.getAllQuestionsBySurvey(survey.id);
        if(questions == null){
            return survey;
        }

        for(Question question : questions){
            question.answers = this.database.getAllAnswersByQuestion(question.questionId);
            survey.questions.add(question);
        }

        return survey;
    }

    public void incrementVoteForAnswer(int answerId){
        this.database.incrementVoteForAnswer(answerId);
    }
}
