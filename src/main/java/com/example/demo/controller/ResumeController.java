package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Resume;
import com.example.demo.entity.Student;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.ResumeService;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private StudentService studentService;

    // ===========================
    // Upload Resume File
    // ===========================

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(

            @RequestParam("title") String title,

            @RequestParam("studentId") Long studentId,

            @RequestParam("file") MultipartFile file) {

        try {

            Student student = studentService.getStudentById(studentId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Student Not Found"));

            String uploadDir = "src/main/resources/static/uploads/resumes/";

            Files.createDirectories(Paths.get(uploadDir));

            String fileName = file.getOriginalFilename();

            Path filePath = Paths.get(uploadDir + fileName);

            Files.copy(file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            Resume resume = new Resume();

            resume.setTitle(title);

            resume.setFileName(fileName);

            resume.setFilePath("/uploads/resumes/" + fileName);

            resume.setUploadDate(LocalDate.now().toString());

            resume.setStudent(student);

            Resume savedResume = resumeService.uploadResume(resume);

            return new ResponseEntity<>(savedResume, HttpStatus.CREATED);

        }

        catch (IOException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to Upload Resume");

        }

    }

    // ===========================
    // Get All Resumes
    // ===========================

    @GetMapping
    public ResponseEntity<List<Resume>> getAllResumes() {

        return ResponseEntity.ok(resumeService.getAllResumes());

    }

    // ===========================
    // Get Resume By Id
    // ===========================

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable Long id) {

        Resume resume = resumeService.getResume(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Not Found"));

        return ResponseEntity.ok(resume);

    }

    // ===========================
    // Update Resume
    // ===========================

    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(

            @PathVariable Long id,

            @Valid @RequestBody Resume resume) {

        resumeService.getResume(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Not Found"));

        resume.setResumeId(id);

        Resume updatedResume = resumeService.updateResume(resume);

        return ResponseEntity.ok(updatedResume);

    }

    // ===========================
    // Delete Resume
    // ===========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(@PathVariable Long id) {

        resumeService.getResume(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume Not Found"));

        resumeService.deleteResume(id);

        return ResponseEntity.ok("Resume Deleted Successfully");

    }

}