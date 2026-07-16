package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Job;

public interface JobService {

    Job addJob(Job job);

    Job updateJob(Job job);

    Optional<Job> getJobById(Long id);

    List<Job> getAllJobs();

    List<Job> getJobsByLocation(String location);

    List<Job> searchJobs(String keyword);

    void deleteJob(Long id);

}