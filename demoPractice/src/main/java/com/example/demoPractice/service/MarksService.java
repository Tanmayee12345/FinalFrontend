package com.example.demoPractice.service;

import com.example.demoPractice.model.*;
import com.example.demoPractice.repository.CourseRepository;
import com.example.demoPractice.repository.MarksRepository;
import com.example.demoPractice.repository.StudentRepository;
import com.example.demoPractice.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Fetch all students in a specific class.
     *
     * @param classId the ID of the class
     * @return List of students in the specified class
     */
    public List<Student> getStudentsByClass(String classId) {
        return studentRepository.findAll().stream()
                .filter(student -> student.getStudentClass() != null && student.getStudentClass().equals(classId))
                .toList();
    }

    /**
     * Add or update marks for a student.
     *
     * @param marks the marks entity to save or update
     * @return Saved or updated marks entity
     */
    public Marks addOrUpdateMarks(Marks marks) {
        if (marks.getStudentId() == null || marks.getTeacherId() == null ||
                marks.getCourseId() == null || marks.getClassId() == null) {
            throw new IllegalArgumentException("All IDs (student, teacher, course, class) must be provided.");
        }

        if (!studentRepository.existsById(marks.getStudentId())) {
            throw new IllegalArgumentException("Invalid student ID: " + marks.getStudentId());
        }

        return marksRepository.save(marks);
    }

    /**
     * Fetch all marks for a specific student.
     *
     * @param studentId the ID of the student
     * @return List of marks for the student
     */
    public List<Marks> getMarksForStudent(String studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new IllegalArgumentException("Invalid student ID: " + studentId);
        }
        return marksRepository.findByStudentId(studentId);
    }

    /**
     * Fetch marks for a specific class and course.
     *
     * @param classId  the ID of the class
     * @param courseId the ID of the course
     * @return List of marks for the class and course
     */
    public List<Marks> getMarksForClassAndCourse(String classId, String courseId) {
        if (classId == null || courseId == null) {
            throw new IllegalArgumentException("Class ID and Course ID must be provided.");
        }
        return marksRepository.findByClassIdAndCourseId(classId, courseId);
    }

    /**
     * Fetch students assigned to a teacher's classes.
     *
     * @param teacherId the ID of the teacher
     * @return List of students assigned to the teacher
     */
    public List<Student> getStudentsByTeacher(String teacherId) {
        // Validate teacher existence
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid teacher ID: " + teacherId));

        // Fetch the teacher's course
        String courseName = teacher.getCourseName();
        if (courseName == null || courseName.isEmpty()) {
            throw new IllegalArgumentException("Teacher is not assigned to any course.");
        }

        // Fetch all classes for the teacher's course
        List<ClassEntity> classesForCourse = courseRepository.findAll().stream()
                .filter(course -> course.getCourseName().equalsIgnoreCase(courseName))
                .map(course -> {
                    ClassEntity cls = new ClassEntity();
                    cls.setClassId(course.getCourseId()); // Assuming courseId is used as classId
                    cls.setClassName(course.getCourseName()); // Using courseName as className
                    return cls;
                })
                .toList();

        // Fetch students in the teacher's classes
        return studentRepository.findAll().stream()
                .filter(student -> classesForCourse.stream()
                        .anyMatch(cls -> cls.getClassId().equals(student.getStudentClass())))
                .toList();
    }
}
