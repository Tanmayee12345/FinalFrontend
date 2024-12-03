package com.example.demoPractice.service;

import com.example.demoPractice.model.Admin;
import com.example.demoPractice.model.Student;
import com.example.demoPractice.model.Teacher;
import com.example.demoPractice.repository.AdminRepository;
import com.example.demoPractice.repository.StudentRepository;
import com.example.demoPractice.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    // Create admin account
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Find admin by username
    public Admin findAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    // Activate student account
    public Student activateStudent(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found: " + id));
        student.setActive(true);
        return studentRepository.save(student);
    }

    // Activate teacher account
    public Teacher activateTeacher(String id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found: " + id));
        teacher.setActive(true);
        return teacherRepository.save(teacher);
    }
}
