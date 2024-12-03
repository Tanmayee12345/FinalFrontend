package com.example.demoPractice.controller;



import com.example.demoPractice.model.User;
import com.example.demoPractice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    @Autowired
    private UserService userService;

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        boolean success = userService.login(user.getUsername(), user.getPassword());
        Map<String, String> response = new HashMap<>();
        if (success) {
            response.put("message", "Login successful!");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid username or password.");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User registeredUser = userService.register(user);
        return ResponseEntity.ok("User registered successfully with ID: " + registeredUser.getId());
    }
}

