package com.example.demoPractice.repository;




import com.example.demoPractice.model.Student;
import com.example.demoPractice.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByIsActiveFalse();
}

