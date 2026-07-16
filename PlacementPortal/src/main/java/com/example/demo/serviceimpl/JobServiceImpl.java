package com.example.demo.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Job;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.service.JobService;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public List<Job> getJobsByLocation(String location) {
        return jobRepository.findByLocation(location);
    }

    @Override
    public List<Job> searchJobs(String keyword) {
        return jobRepository.findByJobTitleContaining(keyword);
    }

    @Override
    public void deleteJob(Long id) {

        // Delete all applications related to this job
        applicationRepository.deleteByJobJobId(id);

        // Delete the job
        jobRepository.deleteById(id);

    }

}