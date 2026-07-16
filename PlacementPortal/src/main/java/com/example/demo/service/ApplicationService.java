package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Application;

public interface ApplicationService {

    Application applyJob(Application application);

    Application updateApplication(Application application);

    Optional<Application> getApplicationById(Long id);

    List<Application> getAllApplications();

    void deleteApplication(Long id);

}