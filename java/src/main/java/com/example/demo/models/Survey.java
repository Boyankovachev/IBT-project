package com.example.demo.models;

import java.util.ArrayList;

//public record Survey (int id,
//                      String name,
//                      ArrayList<Question> questions){
//
//}

public class Survey{
    public int id;
    public String name;
    public ArrayList<Question> questions;

    public Survey(int id, String name){
        this.id = id;
        this.name = name;
    }

    public Survey(int id, String name, ArrayList<Question> questions){
        this.id = id;
        this.name = name;
        this.questions = questions;
    }

    public Survey(){}
}
