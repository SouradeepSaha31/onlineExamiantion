package com.exam.model;

import java.util.List;

public class ExamResult {
    private int score;
    private int total;
    private List<ReviewItem> review;

    public ExamResult(int score, int total, List<ReviewItem> review) {
        this.score = score;
        this.total = total;
        this.review = review;
    }

    public int getScore() { return score; }
    public int getTotal() { return total; }
    public List<ReviewItem> getReview() { return review; }

    public static class ReviewItem {
        private String user;
        private String correct;

        public ReviewItem(String user, String correct) {
            this.user = user;
            this.correct = correct;
        }

        public String getUser() { return user; }
        public String getCorrect() { return correct; }
    }
}
