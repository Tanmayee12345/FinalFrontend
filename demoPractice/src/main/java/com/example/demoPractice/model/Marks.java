package com.example.demoPractice.model;



import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "marks")
public class Marks {
    @Id
    private String id;
    private String studentId; // Reference to the Student
    private String teacherId; // Reference to the Teacher
    private String courseId; // Reference to the Course
    private String classId; // Reference to the Class
    private int marks; // Marks given
    private String remarks; // Optional remarks
}

