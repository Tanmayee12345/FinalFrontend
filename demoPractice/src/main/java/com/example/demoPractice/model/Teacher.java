package com.example.demoPractice.model;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "teachers")
@Getter
@Setter
public class Teacher {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String courseName;
    private String contactDetails;
    private boolean isActive = false; // Default is false
}

