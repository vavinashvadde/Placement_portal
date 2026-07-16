package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @NotBlank(message = "Job title is required")
    @Column(nullable = false)
    private String jobTitle;

    @NotBlank(message = "Job description is required")
    @Column(length = 2000)
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Required skills are required")
    private String requiredSkills;

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.0", message = "Salary must be greater than 0")
    private Double salary;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotBlank(message = "Application deadline is required")
    private String deadline;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Job() {
    }

    public Job(Long jobId, String jobTitle, String description, String location,
               String requiredSkills, Double salary, String experience,
               String jobType, String deadline, Company company) {
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.description = description;
        this.location = location;
        this.requiredSkills = requiredSkills;
        this.salary = salary;
        this.experience = experience;
        this.jobType = jobType;
        this.deadline = deadline;
        this.company = company;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "Job [jobId=" + jobId +
                ", jobTitle=" + jobTitle +
                ", location=" + location +
                ", salary=" + salary +
                ", experience=" + experience +
                ", jobType=" + jobType + "]";
    }
}