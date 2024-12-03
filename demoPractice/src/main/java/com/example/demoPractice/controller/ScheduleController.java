package com.example.demoPractice.controller;



import com.example.demoPractice.model.ClassEntity;
import com.example.demoPractice.repository.ClassRepository;
import com.example.demoPractice.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "http://localhost:4200")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ClassRepository classRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule() {
        scheduleService.createSchedule();
        return ResponseEntity.ok("Schedule created successfully!");
    }

    @PostMapping("/addClass")
    public ResponseEntity<String> addClass(@RequestBody ClassEntity classEntity) {
        if (classRepository.existsByClassName(classEntity.getClassName())) {
            return ResponseEntity.badRequest().body("Class name already exists!");
        }
        classRepository.save(classEntity);
        return ResponseEntity.ok("Class added successfully!");
    }

    @GetMapping("/classes")
    public ResponseEntity<List<ClassEntity>> getClasses() {
        return ResponseEntity.ok(classRepository.findAll());
    }
}

