package com.example.demo.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Application;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.service.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Application applyJob(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public Application updateApplication(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

}