package com.example.demoPractice.repository;



import com.example.demoPractice.model.Marks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MarksRepository extends MongoRepository<Marks, String> {
    List<Marks> findByStudentId(String studentId);
    List<Marks> findByClassIdAndCourseId(String classId, String courseId);
}

