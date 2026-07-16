package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Company;

public interface CompanyService {

    Company registerCompany(Company company);

    Company updateCompany(Company company);

    Optional<Company> getCompanyById(Long id);

    Optional<Company> getCompanyByEmail(String email);

    List<Company> getAllCompanies();

    void deleteCompany(Long id);

}