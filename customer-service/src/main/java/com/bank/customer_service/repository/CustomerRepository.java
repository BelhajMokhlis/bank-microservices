package com.bank.customer_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.customer_service.model.Entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
}
