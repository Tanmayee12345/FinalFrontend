package com.example.demoPractice.repository;




import com.example.demoPractice.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    boolean existsByCourseName(String courseName);
}

