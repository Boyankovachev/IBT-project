package com.example.demo.models;

import java.util.ArrayList;

//public record Question (int questionId,
//                        int surveyId,
//                        String questionText,
//                        ArrayList<Answer> answers){
//}

public class Question{
    public int questionId;
    public int surveyId;
    public String questionText;
    public  ArrayList<Answer> answers;

    public Question(){}
}
