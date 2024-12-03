package com.example.demoPractice.repository;



import com.example.demoPractice.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeacherRepository extends MongoRepository<Teacher, String> {
    List<Teacher> findByIsActiveFalse();
}

