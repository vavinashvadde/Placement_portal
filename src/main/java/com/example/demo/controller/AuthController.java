package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Company;
import com.example.demo.entity.Student;
import com.example.demo.service.CompanyService;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CompanyService companyService;

    // Student Registration
    @PostMapping("/student/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {

        Student savedStudent = studentService.registerStudent(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // Company Registration
    @PostMapping("/company/register")
    public ResponseEntity<Company> registerCompany(@RequestBody Company company) {

        Company savedCompany = companyService.registerCompany(company);
        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    // Student Login
    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody Student student) {

        Optional<Student> dbStudent = studentService.getStudentByEmail(student.getEmail());

        if (dbStudent.isPresent()
                && dbStudent.get().getPassword().equals(student.getPassword())) {

            return ResponseEntity.ok(dbStudent.get());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Student Email or Password");
    }

    // Company Login
    @PostMapping("/company/login")
    public ResponseEntity<?> companyLogin(@RequestBody Company company) {

        Optional<Company> dbCompany = companyService.getCompanyByEmail(company.getEmail());

        if (dbCompany.isPresent()
                && dbCompany.get().getPassword().equals(company.getPassword())) {

            return ResponseEntity.ok(dbCompany.get());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Company Email or Password");
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        return ResponseEntity.ok("Logged Out Successfully");
    }

}