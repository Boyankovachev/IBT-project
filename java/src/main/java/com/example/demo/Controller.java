package com.example.demo;

import com.example.demo.models.Answer;
import com.example.demo.models.Question;
import com.example.demo.models.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/ibt/")
public class Controller {

    @Autowired
    private MyService myService;

    @GetMapping("survey/")
    public Survey getSurveyById(@RequestParam(value = "id") int id){
        return this.myService.getWholeSurvey(id);
    }

    @GetMapping("all/")
    public ArrayList<Survey> getAllSurveys(){
        return this.myService.getAllSurveys();
    }

    @PostMapping("survey/")
    public int createSurvey(@RequestBody Survey survey){
        return this.myService.createSurvey(survey);
    }

    @GetMapping("vote/")
    public void voteForAnswer(@RequestParam(value = "id") int id){
       this.myService.incrementVoteForAnswer(id);
    }

}
