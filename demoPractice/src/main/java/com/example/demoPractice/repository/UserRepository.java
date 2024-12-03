package com.example.demoPractice.repository;





import com.example.demoPractice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username); // Query user by username
}

