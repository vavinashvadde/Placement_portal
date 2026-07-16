package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Resume;

public interface ResumeService {

    Resume uploadResume(Resume resume);

    List<Resume> getAllResumes();

    Resume updateResume(Resume resume);

    Optional<Resume> getResume(Long id);

    void deleteResume(Long id);

}