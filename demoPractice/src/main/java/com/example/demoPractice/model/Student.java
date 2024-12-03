package com.example.demoPractice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id = UUID.randomUUID().toString(); // Automatically generate a unique ID
    private String name;
    private String dateOfBirth;
    private String email;
    private String address;
    private String studentClass; // Class field
    private boolean isActive = false; // Default is false
}

