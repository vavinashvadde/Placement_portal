package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Register Student
    @PostMapping
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody Student student) {
        Student savedStudent = studentService.registerStudent(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {

        Optional<Student> student = studentService.getStudentById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Student Not Found");
    }

    // Get Student By Email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getStudentByEmail(@PathVariable String email) {

        Optional<Student> student = studentService.getStudentByEmail(email);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Student Not Found");
    }

    // Update Student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id,
                                           @Valid @RequestBody Student student) {

        Optional<Student> existingStudent = studentService.getStudentById(id);

        if (existingStudent.isPresent()) {

            student.setStudentId(id);

            Student updatedStudent = studentService.updateStudent(student);

            return ResponseEntity.ok(updatedStudent);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Student Not Found");
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {

        Optional<Student> student = studentService.getStudentById(id);

        if (student.isPresent()) {

            studentService.deleteStudent(id);

            return ResponseEntity.ok("Student Deleted Successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Student Not Found");
    }

}