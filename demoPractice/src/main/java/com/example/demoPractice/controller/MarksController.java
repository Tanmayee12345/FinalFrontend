package com.example.demoPractice.controller;


import com.example.demoPractice.model.Marks;
import com.example.demoPractice.model.Student;
import com.example.demoPractice.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:4200")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @GetMapping("/students/teacher/{teacherId}")
    public ResponseEntity<List<Student>> getStudentsByTeacher(@PathVariable String teacherId) {
        List<Student> students = marksService.getStudentsByTeacher(teacherId);
        return ResponseEntity.ok(students);
    }

    // Fetch students for a class
    @GetMapping("/students/{classId}")
    public ResponseEntity<List<Student>> getStudentsByClass(@PathVariable String classId) {
        List<Student> students = marksService.getStudentsByClass(classId);
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(students);
    }

    // Add or update marks
    @PostMapping("/add")
    public ResponseEntity<Marks> addOrUpdateMarks(@RequestBody Marks marks) {
        Marks savedMarks = marksService.addOrUpdateMarks(marks);
        return ResponseEntity.ok(savedMarks);
    }

    // Get marks for a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Marks>> getMarksForStudent(@PathVariable String studentId) {
        List<Marks> marks = marksService.getMarksForStudent(studentId);
        if (marks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(marks);
    }

    // Get marks for a class and course
    @GetMapping("/class/{classId}/course/{courseId}")
    public ResponseEntity<List<Marks>> getMarksForClassAndCourse(
            @PathVariable String classId, @PathVariable String courseId) {
        List<Marks> marks = marksService.getMarksForClassAndCourse(classId, courseId);
        if (marks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(marks);
    }
}

