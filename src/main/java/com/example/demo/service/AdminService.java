package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Admin;

public interface AdminService {

    Admin saveAdmin(Admin admin);

    List<Admin> getAllAdmins();

    Optional<Admin> getAdmin(Long id);

    Optional<Admin> getAdminByEmail(String email);

    Admin updateAdmin(Admin admin);

    void deleteAdmin(Long id);

}