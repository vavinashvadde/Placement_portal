package com.example.demo.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Resume;
import com.example.demo.repository.ResumeRepository;
import com.example.demo.service.ResumeService;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Override
    public Resume uploadResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    @Override
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    @Override
    public Resume updateResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    @Override
    public Optional<Resume> getResume(Long id) {
        return resumeRepository.findById(id);
    }

    @Override
    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }

}