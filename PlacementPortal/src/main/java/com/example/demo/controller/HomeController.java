package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // Home
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Authentication
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    // ===========================
    // Student Module
    // ===========================

    @GetMapping("/student/dashboard")
    public String studentDashboard() {
        return "student/dashboard";
    }

    @GetMapping("/student/profile")
    public String studentProfile() {
        return "student/profile";
    }

    @GetMapping("/student/jobs")
    public String studentJobs() {
        return "student/jobs";
    }

    @GetMapping("/student/applied-jobs")
    public String appliedJobs() {
        return "student/applied-jobs";
    }

    @GetMapping("/student/upload-resume")
    public String uploadResume() {
        return "student/upload-resume";
    }

    @GetMapping("/student/notifications")
    public String notifications() {
        return "student/notifications";
    }

    // ===========================
    // Company Module
    // ===========================

    @GetMapping("/company/dashboard")
    public String companyDashboard() {
        return "company/dashboard";
    }

    @GetMapping("/company/profile")
    public String companyProfile() {
        return "company/profile";
    }

    @GetMapping("/company/post-job")
    public String postJob() {
        return "company/post-job";
    }

    @GetMapping("/company/manage-jobs")
    public String manageJobs() {
        return "company/manage-jobs";
    }

    @GetMapping("/company/applicants")
    public String applicants() {
        return "company/applicants";
    }

    // ===========================
    // Admin Module
    // ===========================

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/admin/students")
    public String students() {
        return "admin/students";
    }

    @GetMapping("/admin/companies")
    public String companies() {
        return "admin/companies";
    }

    @GetMapping("/admin/jobs")
    public String jobs() {
        return "admin/jobs";
    }

    @GetMapping("/admin/reports")
    public String reports() {
        return "admin/reports";
    }

}