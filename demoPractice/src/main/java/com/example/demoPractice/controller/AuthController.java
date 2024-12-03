package com.example.demoPractice.controller;




import com.example.demoPractice.model.Student;
import com.example.demoPractice.model.Teacher;
import com.example.demoPractice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup/student")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        return ResponseEntity.ok(authService.registerStudent(student));
    }

    @PostMapping("/signup/teacher")
    public ResponseEntity<Teacher> registerTeacher(@RequestBody Teacher teacher) {
        return ResponseEntity.ok(authService.registerTeacher(teacher));
    }
    @PostMapping("/login/student")
    public ResponseEntity<Map<String, String>> studentLogin(@RequestBody Map<String, String> loginDetails) {
        String id = loginDetails.get("id");
        String email = loginDetails.get("email");

        // Debug logs
        System.out.println("Student Login Attempt");
        System.out.println("ID: " + id);
        System.out.println("Email: " + email);

        Map<String, String> response = new HashMap<>();
        if (authService.verifyStudentLogin(id, email)) {
            System.out.println("Login Successful");
            response.put("message", "Login successful!");
            return ResponseEntity.ok(response);
        } else {
            System.out.println("Login Failed: Invalid credentials or account inactive.");
            response.put("error", "Invalid credentials or account is inactive.");
            return ResponseEntity.status(401).body(response);
        }
    }



    @PostMapping("/login/teacher")
    public ResponseEntity<String> teacherLogin(@RequestBody Map<String, String> loginDetails) {
        String id = loginDetails.get("id");

        // Debug logs
        System.out.println("Teacher Login Attempt");
        System.out.println("ID: " + id);

        if (authService.verifyTeacherLogin(id)) {
            System.out.println("Login Successful");
            return ResponseEntity.ok("Login successful!");
        } else {
            System.out.println("Login Failed: Invalid credentials or account inactive.");
            return ResponseEntity.status(401).body("Invalid credentials or account is inactive.");
        }
    }

}

