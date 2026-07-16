package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Application;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Apply for Job
    @PostMapping
    public ResponseEntity<Application> applyJob(@Valid @RequestBody Application application) {

        Application savedApplication = applicationService.applyJob(application);

        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    // Get All Applications
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {

        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // Get Application By ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {

        Application application = applicationService.getApplicationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application Not Found"));

        return ResponseEntity.ok(application);
    }

    // Update Application
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id,
                                                         @Valid @RequestBody Application application) {

        applicationService.getApplicationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application Not Found"));

        application.setApplicationId(id);

        Application updatedApplication = applicationService.updateApplication(application);

        return ResponseEntity.ok(updatedApplication);
    }

    // Delete Application
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {

        applicationService.getApplicationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application Not Found"));

        applicationService.deleteApplication(id);

        return ResponseEntity.ok("Application Deleted Successfully");
    }

}