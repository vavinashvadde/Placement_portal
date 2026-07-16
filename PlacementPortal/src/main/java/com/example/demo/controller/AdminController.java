package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Admin;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Create Admin
    @PostMapping
    public ResponseEntity<Admin> saveAdmin(@Valid @RequestBody Admin admin) {

        Admin savedAdmin = adminService.saveAdmin(admin);

        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    // Get All Admins
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {

        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // Get Admin By ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {

        Admin admin = adminService.getAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin Not Found"));

        return ResponseEntity.ok(admin);
    }

    // Get Admin By Email
    @GetMapping("/email/{email}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {

        Admin admin = adminService.getAdminByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin Not Found"));

        return ResponseEntity.ok(admin);
    }

    // Update Admin
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id,
                                             @Valid @RequestBody Admin admin) {

        adminService.getAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin Not Found"));

        admin.setAdminId(id);

        Admin updatedAdmin = adminService.updateAdmin(admin);

        return ResponseEntity.ok(updatedAdmin);
    }

    // Delete Admin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {

        adminService.getAdmin(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin Not Found"));

        adminService.deleteAdmin(id);

        return ResponseEntity.ok("Admin Deleted Successfully");
    }
}