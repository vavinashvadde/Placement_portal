package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeId;

    @NotBlank(message = "Resume title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Resume file name is required")
    @Column(nullable = false)
    private String fileName;

    @NotBlank(message = "Resume file path is required")
    @Column(nullable = false)
    private String filePath;

    @NotBlank(message = "Upload date is required")
    @Column(nullable = false)
    private String uploadDate;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public Resume() {
    }

    public Resume(Long resumeId,
                  String title,
                  String fileName,
                  String filePath,
                  String uploadDate,
                  Student student) {

        this.resumeId = resumeId;
        this.title = title;
        this.fileName = fileName;
        this.filePath = filePath;
        this.uploadDate = uploadDate;
        this.student = student;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return "Resume [resumeId=" + resumeId +
                ", title=" + title +
                ", fileName=" + fileName +
                ", filePath=" + filePath +
                ", uploadDate=" + uploadDate + "]";
    }
}