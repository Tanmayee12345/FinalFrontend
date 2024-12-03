package com.example.demoPractice.model;





import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Users")
public class User {
    @Id
    private String id;
    private String username;
    private String password; // Plaintext or hashed (recommended to hash for security)
}

