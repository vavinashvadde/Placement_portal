package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Student;

public interface StudentService {

    Student registerStudent(Student student);

    Student updateStudent(Student student);

    Optional<Student> getStudentById(Long id);

    Optional<Student> getStudentByEmail(String email);

    List<Student> getAllStudents();

    void deleteStudent(Long id);

}