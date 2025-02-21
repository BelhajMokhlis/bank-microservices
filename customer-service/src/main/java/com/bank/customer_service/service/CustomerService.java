package com.bank.customer_service.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bank.customer_service.dto.request.CustomerRequest;
import com.bank.customer_service.dto.response.CustomerResponse;

@Service
public interface CustomerService {
    CustomerResponse createCustomer(CustomerRequest request);
    Page<CustomerResponse> getAllCustomers(Pageable pageable);
    CustomerResponse getCustomerById(Long id);

}
