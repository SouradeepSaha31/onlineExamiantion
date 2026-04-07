package com.exam.service;

import com.exam.model.Question;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class QuestionService {

    private final List<Question> questions = Arrays.asList(
        new Question(1, "What is the capital of India?",
            Arrays.asList("Mumbai", "Delhi", "Kolkata", "Chennai"), "Delhi"),

        new Question(2, "Which language is used for Android development?",
            Arrays.asList("Python", "Java", "Swift", "C++"), "Java"),

        new Question(3, "What does HTML stand for?",
            Arrays.asList("HyperText Markup Language", "High Tech Modern Language", "HyperText Machine Language", "Home Tool Markup Language"),
            "HyperText Markup Language"),

        new Question(4, "Which planet is known as the Red Planet?",
            Arrays.asList("Venus", "Jupiter", "Mars", "Saturn"), "Mars"),

        new Question(5, "What is the result of 7 × 8?",
            Arrays.asList("54", "56", "58", "64"), "56"),

        new Question(6, "Who is known as the Father of Computers?",
            Arrays.asList("Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"), "Charles Babbage"),

        new Question(7, "Which data structure uses LIFO order?",
            Arrays.asList("Queue", "Array", "Stack", "Linked List"), "Stack"),

        new Question(8, "What is the full form of CPU?",
            Arrays.asList("Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Core Processing Unit"),
            "Central Processing Unit"),

        new Question(9, "Which of the following is NOT a programming language?",
            Arrays.asList("Python", "HTML", "Java", "C#"), "HTML"),

        new Question(10, "What is the time complexity of Binary Search?",
            Arrays.asList("O(n)", "O(n²)", "O(log n)", "O(1)"), "O(log n)"),

        new Question(11, "Which company developed Java?",
            Arrays.asList("Microsoft", "Google", "Sun Microsystems", "Apple"), "Sun Microsystems"),

        new Question(12, "What does SQL stand for?",
            Arrays.asList("Structured Query Language", "Simple Query Language", "Standard Query Logic", "Sequential Query Language"),
            "Structured Query Language"),

        new Question(13, "Which HTTP method is used to send data to a server?",
            Arrays.asList("GET", "DELETE", "POST", "PUT"), "POST"),

        new Question(14, "What is the largest ocean on Earth?",
            Arrays.asList("Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"), "Pacific Ocean"),

        new Question(15, "Which sorting algorithm has best average-case performance?",
            Arrays.asList("Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"), "Merge Sort"),

        new Question(16, "What symbol is used for single-line comments in Java?",
            Arrays.asList("<!-- -->", "#", "//", "/* */"), "//"),

        new Question(17, "Which keyword is used to inherit a class in Java?",
            Arrays.asList("implements", "extends", "inherits", "super"), "extends"),

        new Question(18, "What does OOP stand for?",
            Arrays.asList("Object Oriented Programming", "Open Output Program", "Object Output Processing", "Operational Object Program"),
            "Object Oriented Programming"),

        new Question(19, "Which of these is a NoSQL database?",
            Arrays.asList("MySQL", "PostgreSQL", "Oracle", "MongoDB"), "MongoDB"),

        new Question(20, "What port does Spring Boot run on by default?",
            Arrays.asList("8000", "3000", "8080", "5000"), "8080")
    );

    public List<Question> getAllQuestions() {
        return questions;
    }
}
