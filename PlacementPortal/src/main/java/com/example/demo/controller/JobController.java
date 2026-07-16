package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Job;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    // Add Job
    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody Job job) {

        Job savedJob = jobService.addJob(job);

        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    // Get All Jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get Job By ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {

        Job job = jobService.getJobById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found"));

        return ResponseEntity.ok(job);
    }

    // Update Job
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id,
                                         @Valid @RequestBody Job job) {

        jobService.getJobById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found"));

        job.setJobId(id);

        Job updatedJob = jobService.updateJob(job);

        return ResponseEntity.ok(updatedJob);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {

        jobService.getJobById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found"));

        jobService.deleteJob(id);

        return ResponseEntity.ok("Job Deleted Successfully");
    }

    // Search Jobs by Title
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Job>> searchJobs(@PathVariable String keyword) {

        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }

    // Get Jobs by Location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Job>> getJobsByLocation(@PathVariable String location) {

        return ResponseEntity.ok(jobService.getJobsByLocation(location));
    }

}