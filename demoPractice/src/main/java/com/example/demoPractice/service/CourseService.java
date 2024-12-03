package com.example.demoPractice.service;



import com.example.demoPractice.model.Course;
import com.example.demoPractice.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course addCourse(Course course) {
        // Check if the course name already exists
        if (courseRepository.existsByCourseName(course.getCourseName())) {
            throw new IllegalArgumentException("Course name already exists in the database.");
        }
        // Save the course to the database
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }
}

