package com.example.demo;

import com.example.demo.models.Answer;
import com.example.demo.models.Question;
import com.example.demo.models.Survey;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Service
public class Database {

    private Connection connection;
    public Database(){
        try {

            String dbPath = System.getProperty("user.dir") + "\\database.db";
            connection = DriverManager.getConnection("jdbc:sqlite:" + dbPath);

        } catch ( Exception e ) {
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            System.exit(0);
        }
    }

    public ArrayList<Survey> getAllSurveys(){
        try {
            ArrayList<Survey> result = new ArrayList<>();
            Statement stm = connection.createStatement();
            ResultSet rs = stm.executeQuery("SELECT * FROM survey");
            while (rs.next()){
                result.add(new Survey(
                        rs.getInt(1),
                        rs.getString(2),
                        new ArrayList<>()
                        )
                );
            }
            return result;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int createSurvey(Survey survey){
        // vrushta auto incrment id'to na suzdanoto survey
        try {
            String sqlSurvey = "INSERT INTO survey(name)" +
                    "VALUES(?)";
            PreparedStatement statement = connection.prepareStatement(sqlSurvey);
            statement.setString(1, survey.name);
            statement.execute();

            String sqlGetAutoIncrId = "select last_insert_rowid();";
            PreparedStatement statementId = connection.prepareStatement(sqlGetAutoIncrId);
            ResultSet resultSet = statementId.executeQuery();
            int newId = resultSet.getInt(1);
            return newId;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public int createQuestion(Question question){
        // vrushta auto incrment id'to na suzdadeniq vupros
        try {
            String sqlSurvey = "INSERT INTO question(survey_id, question_text)" +
                    "VALUES(?,?)";
            PreparedStatement statement = connection.prepareStatement(sqlSurvey);
            statement.setInt(1, question.surveyId);
            statement.setString(2, question.questionText);
            statement.execute();

            String sqlGetAutoIncrId = "select last_insert_rowid();";
            PreparedStatement statementId = connection.prepareStatement(sqlGetAutoIncrId);
            ResultSet resultSet = statementId.executeQuery();
            int newId = resultSet.getInt(1);
            return newId;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public int createAnswer(Answer answer){
        // vrushta auto incrment id'to na suzdadeniq otgovor
        try {
            String sqlSurvey = "INSERT INTO answer(question_id, answer_text, votes)" +
                    "VALUES(?,?, ?)";
            PreparedStatement statement = connection.prepareStatement(sqlSurvey);
            statement.setInt(1, answer.questionId);
            statement.setString(2, answer.answerText);
            statement.setInt(3, answer.votes);
            statement.execute();

            String sqlGetAutoIncrId = "select last_insert_rowid();";
            PreparedStatement statementId = connection.prepareStatement(sqlGetAutoIncrId);
            ResultSet resultSet = statementId.executeQuery();
            int newId = resultSet.getInt(1);
            return newId;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public Survey getSurveyRowById(int surveyId){
        try {
            Survey result = new Survey();
            String sql = "SELECT * FROM survey " +
                    "WHERE survey_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, surveyId);
            ResultSet resultSet = statement.executeQuery();
            result.id = resultSet.getInt(1);
            result.name = resultSet.getString(2);
            return result;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<Question> getAllQuestionsBySurvey(int surveyId){
        try {
            ArrayList<Question> result = new ArrayList<Question>();
            String sql = "SELECT * FROM question " +
                    "WHERE survey_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, surveyId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()){
                Question newQuestion = new Question();
                newQuestion.questionId = resultSet.getInt(1);
                newQuestion.surveyId = resultSet.getInt(2);
                newQuestion.questionText = resultSet.getString(3);
                result.add(newQuestion);
            }
            return result;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<Answer> getAllAnswersByQuestion(int questionId){
        try {
            ArrayList<Answer> result = new ArrayList<Answer>();
            String sql = "SELECT * FROM answer " +
                    "WHERE question_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, questionId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()){
                Answer newAnswer = new Answer();
                newAnswer.answerId = resultSet.getInt(1);
                newAnswer.questionId = resultSet.getInt(2);
                newAnswer.answerText = resultSet.getString(3);
                newAnswer.votes = resultSet.getInt(4);
                result.add(newAnswer);
            }
            return result;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void incrementVoteForAnswer(int answerId) {
        try {
            String sql = "UPDATE answer " +
                    "SET votes = votes + 1 " +
                    "WHERE answer_id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, answerId);
            statement.execute();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

}
