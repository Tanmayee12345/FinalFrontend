package com.example.demoPractice.service;



import com.example.demoPractice.model.Student;
import com.example.demoPractice.model.Teacher;
import com.example.demoPractice.repository.StudentRepository;
import com.example.demoPractice.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> getInactiveTeachers() {
        return teacherRepository.findByIsActiveFalse();
    }

    public List<Student> getInactiveStudents() {
        return studentRepository.findByIsActiveFalse();
    }

    public Student registerStudent(Student student) {
        student.setId(UUID.randomUUID().toString());
        student.setActive(false); // Default to false
        return studentRepository.save(student);
    }

    public Teacher registerTeacher(Teacher teacher) {
        teacher.setId(UUID.randomUUID().toString());
        teacher.setActive(false); // Default to false
        return teacherRepository.save(teacher);
    }
    public boolean verifyStudentLogin(String id, String email) {
        Optional<Student> student = studentRepository.findById(id);
        System.out.println(student.isPresent());
        System.out.println(student.get().getEmail().equals(email));
        System.out.println(student.get().isActive());

        if (student.isPresent() && student.get().getEmail().equals(email) && student.get().isActive()) {
            return true;
        }
        return false;
    }

    public boolean verifyTeacherLogin(String id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()  && teacher.get().isActive()) {
            return true;
        }
        return false;
    }
}
