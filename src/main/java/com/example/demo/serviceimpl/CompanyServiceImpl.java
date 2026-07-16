package com.example.demo.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Company;
import com.example.demo.entity.Job;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private ApplicationRepository applicationRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company registerCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    @Override
    public Optional<Company> getCompanyByEmail(String email) {
        return companyRepository.findByEmail(email);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public void deleteCompany(Long id) {

        List<Job> jobs = jobRepository.findByCompanyCompanyId(id);

        for (Job job : jobs) {
            applicationRepository.deleteByJobJobId(job.getJobId());
        }

        jobRepository.deleteAll(jobs);

        companyRepository.deleteById(id);
    }

}