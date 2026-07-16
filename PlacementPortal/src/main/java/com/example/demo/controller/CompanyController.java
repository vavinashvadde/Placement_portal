package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Company;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.CompanyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Register Company
    @PostMapping
    public ResponseEntity<Company> registerCompany(@Valid @RequestBody Company company) {

        Company savedCompany = companyService.registerCompany(company);

        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    // Get All Companies
    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    // Get Company By ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {

        Company company = companyService.getCompanyById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company Not Found"));

        return ResponseEntity.ok(company);
    }

    // Get Company By Email
    @GetMapping("/email/{email}")
    public ResponseEntity<Company> getCompanyByEmail(@PathVariable String email) {

        Company company = companyService.getCompanyByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Company Not Found"));

        return ResponseEntity.ok(company);
    }

    // Update Company
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id,
                                                 @Valid @RequestBody Company company) {

        companyService.getCompanyById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company Not Found"));

        company.setCompanyId(id);

        Company updatedCompany = companyService.updateCompany(company);

        return ResponseEntity.ok(updatedCompany);
    }

    // Delete Company
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable Long id) {

        companyService.getCompanyById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company Not Found"));

        companyService.deleteCompany(id);

        return ResponseEntity.ok("Company Deleted Successfully");
    }

}