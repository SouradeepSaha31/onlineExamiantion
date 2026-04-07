package com.exam.model;

import java.util.List;

public class QuestionDTO {
    private int id;
    private String question;
    private List<String> options;

    public QuestionDTO(int id, String question, List<String> options) {
        this.id = id;
        this.question = question;
        this.options = options;
    }

    public int getId() { return id; }
    public String getQuestion() { return question; }
    public List<String> getOptions() { return options; }
}
