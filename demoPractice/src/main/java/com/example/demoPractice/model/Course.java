package com.example.demoPractice.model;




import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String courseId;
    private String courseName;
    private String description;
}

