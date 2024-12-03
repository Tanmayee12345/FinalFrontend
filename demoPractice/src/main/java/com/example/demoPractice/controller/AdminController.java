package com.example.demoPractice.controller;

import com.example.demoPractice.model.Admin;
import com.example.demoPractice.model.Student;
import com.example.demoPractice.model.Teacher;
import com.example.demoPractice.service.AdminService;
import com.example.demoPractice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AuthService authService;

    // Admin Signup Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> createAdmin(@RequestBody Admin admin) {
        // Validate input
        if (admin.getUsername() == null || admin.getUsername().isEmpty() ||
                admin.getPassword() == null || admin.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Username and password are required.");
        }

        // Hash password before saving
        admin.setPassword(BCrypt.hashpw(admin.getPassword(), BCrypt.gensalt()));

        // Save admin
        adminService.createAdmin(admin);

        return ResponseEntity.ok("Admin account created successfully.");
    }

    // Admin Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody Admin loginRequest) {
        Admin admin = adminService.findAdminByUsername(loginRequest.getUsername());

        if (admin == null) {
            return ResponseEntity.status(404).body("Admin not found.");
        }

        // Validate password
        if (!BCrypt.checkpw(loginRequest.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials.");
        }

        return ResponseEntity.ok("Admin login successful.");
    }

    // Activate Student
    @PutMapping("/activate/student/{id}")
    public ResponseEntity<Student> activateStudent(@PathVariable String id) {
        return ResponseEntity.ok(adminService.activateStudent(id));
    }

    // Activate Teacher
    @PutMapping("/activate/teacher/{id}")
    public ResponseEntity<Teacher> activateTeacher(@PathVariable String id) {
        return ResponseEntity.ok(adminService.activateTeacher(id));
    }

    // Get Inactive Teachers
    @GetMapping("/teachers/inactive")
    public ResponseEntity<List<Teacher>> getInactiveTeachers() {
        return ResponseEntity.ok(authService.getInactiveTeachers());
    }

    // Get Inactive Students
    @GetMapping("/students/inactive")
    public ResponseEntity<List<Student>> getInactiveStudents() {
        return ResponseEntity.ok(authService.getInactiveStudents());
    }
}
