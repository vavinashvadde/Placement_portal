package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Application;
import com.example.demo.entity.Job;
import com.example.demo.entity.Student;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudent(Student student);

    List<Application> findByJob(Job job);

    @Transactional
    void deleteByJobJobId(Long jobId);

}