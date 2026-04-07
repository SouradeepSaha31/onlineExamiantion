package com.exam.controller;

import com.exam.model.ExamResult;
import com.exam.model.ExamResult.ReviewItem;
import com.exam.model.Question;
import com.exam.model.QuestionDTO;
import com.exam.model.SubmitRequest;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/OnlineExam")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private QuestionService questionService;

    // GET /OnlineExam/questions — returns questions without answers
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions() {
        List<Question> questions = questionService.getAllQuestions();

        List<QuestionDTO> dtos = questions.stream()
            .map(q -> new QuestionDTO(q.getId(), q.getQuestion(), q.getOptions()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // POST /OnlineExam/submit — evaluates answers and returns result
    @PostMapping("/submit")
    public ResponseEntity<ExamResult> submitExam(@RequestBody SubmitRequest request) {
        List<Question> questions = questionService.getAllQuestions();
        List<String> userAnswers = request.getAnswers();

        int score = 0;
        List<ReviewItem> review = new ArrayList<>();

        for (int i = 0; i < questions.size(); i++) {
            String correct = questions.get(i).getAnswer();
            String userAnswer = (userAnswers != null && i < userAnswers.size())
                ? userAnswers.get(i) : "Not Answered";

            if (correct.equalsIgnoreCase(userAnswer)) {
                score++;
            }
            review.add(new ReviewItem(userAnswer, correct));
        }

        ExamResult result = new ExamResult(score, questions.size(), review);
        return ResponseEntity.ok(result);
    }
}
